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

const token = process.env.SANITY_TOKEN;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || fallbackProjectId;
const dataset = 'production';

if (!token) {
  console.error('ERROR: Missing SANITY_TOKEN. Please set it using: $env:SANITY_TOKEN="your_token_here"');
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

function vnSlugify(str) {
  str = str.toLowerCase();
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
  str = str.replace(/(đ)/g, 'd');
  str = str.replace(/([^0-9a-z-\s])/g, '');
  str = str.replace(/(\s+)/g, '-');
  str = str.replace(/^-+/g, '');
  str = str.replace(/-+$/g, '');
  return str;
}

async function fillData() {
  console.log("Fetching products...");
  const products = await client.fetch(`*[_type == "product"]`);
  
  console.log("Fetching categories...");
  const categories = await client.fetch(`*[_type == "category"]`);
  const catMap = {};
  for(const cat of categories) {
    catMap[cat.title.toLowerCase()] = cat._id;
  }
  
  // Ensure default categories exist
  const neededCategories = ["Áo", "Quần", "Váy", "Túi xách", "Phụ kiện", "Giày"];
  for (const needed of neededCategories) {
    if (!catMap[needed.toLowerCase()]) {
      console.log(`Creating category: ${needed}`);
      const catDoc = await client.create({
        _type: 'category',
        title: needed,
        slug: { _type: 'slug', current: vnSlugify(needed) }
      });
      catMap[needed.toLowerCase()] = catDoc._id;
    }
  }

  // Common size guide
  const mockSizeGuide = {
    headers: ["KHU VỰC", "XS", "S", "M", "L"],
    rows: [
      { _key: 'row1', label: "Ngực", values: ["41.0", "43.0", "45.0", "47.0"] },
      { _key: 'row2', label: "Chiều dài phía trước", values: ["50.5", "51.5", "52.5", "53.5"] },
      { _key: 'row3', label: "Chiều rộng lưng", values: ["30.0", "31.0", "32.0", "33.0"] }
    ]
  };
  
  // Common care details
  const mockCareDetails = {
    _type: 'object',
    materialOuter: "100% Cotton chất lượng cao",
    materialInner: "Không có lớp lót",
    careInstructions: [
      "Giặt tay hoặc giặt máy nhẹ",
      "Không sử dụng nước tẩy",
      "Ủi ở nhiệt độ thấp"
    ],
    origin: "Sản xuất tại Việt Nam"
  };

  for (const product of products) {
    let patch = client.patch(product._id);
    let updated = false;

    // 1. Slug
    if (!product.slug || !product.slug.current) {
      patch = patch.set({ slug: { _type: 'slug', current: vnSlugify(product.name) } });
      updated = true;
    }

    // 2. Category
    if (!product.category) {
      let targetCat = null;
      const lowerName = product.name.toLowerCase();
      if (lowerName.includes("áo")) targetCat = "áo";
      else if (lowerName.includes("quần") || lowerName.includes("shorts")) targetCat = "quần";
      else if (lowerName.includes("váy") || lowerName.includes("đầm")) targetCat = "váy";
      else if (lowerName.includes("túi")) targetCat = "túi xách";
      else if (lowerName.includes("giày") || lowerName.includes("boots")) targetCat = "giày";
      else if (lowerName.includes("khăn") || lowerName.includes("mũ") || lowerName.includes("kính")) targetCat = "phụ kiện";
      else targetCat = "phụ kiện";

      patch = patch.set({ category: { _type: 'reference', _ref: catMap[targetCat] } });
      updated = true;
    }
    
    // 3. Fill missing sizeGuide and careDetails
    if (!product.sizeGuide) {
      patch = patch.set({ sizeGuide: mockSizeGuide });
      updated = true;
    }
    if (!product.careDetails) {
      patch = patch.set({ careDetails: mockCareDetails });
      updated = true;
    }

    if (updated) {
      console.log(`Updating product: ${product.name}`);
      await patch.commit();
    }
  }

  console.log("Data fill complete!");
}

fillData().catch(console.error);
