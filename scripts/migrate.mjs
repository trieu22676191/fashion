import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Read .env.local manually since node doesn't auto-load it without dotenv
let envLocal = '';
try {
  envLocal = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
} catch (e) {}

const projectIdMatch = envLocal.match(/NEXT_PUBLIC_SANITY_PROJECT_ID="?([^"\n]+)"?/);
const fallbackProjectId = projectIdMatch ? projectIdMatch[1] : null;

// WARNING: You need to set SANITY_TOKEN environment variable
// Get a token from: https://sanity.io/manage -> Project -> API -> Tokens -> Add Editor Token
const token = process.env.SANITY_TOKEN;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || fallbackProjectId;
const dataset = 'production';

if (!token) {
  console.error('ERROR: Missing SANITY_TOKEN. Please set it using: set SANITY_TOKEN=your_token_here');
  process.exit(1);
}

if (!projectId) {
  console.error('ERROR: Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2023-10-01',
  token,
});

async function uploadImageFromUrl(url) {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    // Assuming image type is jpeg based on unsplash/zara urls
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: 'image.jpg'
    });
    return {
      _key: Math.random().toString(36).substring(7),
      _type: 'image',
      asset: { _type: "reference", _ref: asset._id }
    };
  } catch (err) {
    console.error("Failed to upload image:", url, err);
    return null;
  }
}

async function migrate() {
  console.log('Starting migration...');
  
  // Dynamically import collections data
  const { collectionsData } = await import('../src/data/collections.js');

  const createdCollections = {};
  const productRefMap = {}; // Maps old product ID to Sanity Document ID

  // Step 1: Create Collections and Basic Products (without related products)
  for (const [slug, data] of Object.entries(collectionsData)) {
    console.log(`Creating collection: ${data.title}...`);
    
    // Create Collection
    const collectionDoc = await client.create({
      _type: 'collection',
      title: data.title,
      slug: { _type: 'slug', current: slug },
      description: data.description,
    });
    
    createdCollections[slug] = collectionDoc._id;

    // Create Products in this collection
    for (const product of data.products) {
      console.log(`  Creating product: ${product.name}...`);
      
      // Upload images
      const sanityImages = [];
      for (const imgUrl of product.images || []) {
        // If image upload fails or is too slow, we can just save it as string if we allowed it,
        // but our schema accepts image object or string. Let's upload to be safe.
        const uploaded = await uploadImageFromUrl(imgUrl);
        if (uploaded) sanityImages.push(uploaded);
      }

      // Prepare care details if any
      let careDetailsObj = undefined;
      if (product.careDetails) {
        careDetailsObj = {
          _type: 'object',
          materialOuter: product.careDetails.material?.outer,
          materialInner: product.careDetails.material?.inner,
          careInstructions: product.careDetails.care,
          origin: product.careDetails.origin
        };
      }

      const productDoc = await client.create({
        _type: 'product',
        name: product.name,
        productId: product.id,
        price: product.price,
        description: product.description,
        color: product.color,
        images: sanityImages,
        collection: { _type: 'reference', _ref: collectionDoc._id },
        sizeGuide: product.sizeGuide,
        careDetails: careDetailsObj,
      });

      productRefMap[product.id] = {
        _id: productDoc._id,
        related: product.relatedProducts || []
      };
    }
  }

  console.log("Setting up related products...");
  
  // Step 2: Link Related Products
  for (const [oldId, meta] of Object.entries(productRefMap)) {
    if (meta.related && meta.related.length > 0) {
      const references = meta.related.map(relId => {
        const targetId = productRefMap[relId]?._id;
        if (!targetId) return null;
        return { _type: 'reference', _ref: targetId, _key: Math.random().toString(36).substring(7) };
      }).filter(Boolean);

      if (references.length > 0) {
        await client.patch(meta._id)
          .set({ relatedProducts: references })
          .commit();
      }
    }
  }

  console.log('Migration complete!');
}

migrate().catch(console.error);
