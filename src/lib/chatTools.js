import { client } from "@/lib/sanityQueries";
import { groq } from "next-sanity";

const productFields = groq`
  _id,
  "id": coalesce(slug.current, _id),
  name,
  price,
  "images": images[].asset->url,
  description,
  color
`;

export async function searchProductsForChat(query) {
  if (!query || !query.trim()) return [];

  const searchStr = `*${query.trim()}*`;
  const searchQuery = groq`
    *[_type == "product" && (name match $searchStr || description match $searchStr) && isActive != false]
      | order(_createdAt desc) [0...8] { ${productFields} }
  `;

  try {
    return await client.fetch(searchQuery, { searchStr });
  } catch (error) {
    console.error("searchProductsForChat error:", error);
    return [];
  }
}

export async function getProductsByIds(ids) {
  if (!ids || ids.length === 0) return [];

  const byIdQuery = groq`
    *[_type == "product" && (slug.current in $ids || _id in $ids) && isActive != false] { ${productFields} }
  `;

  try {
    return await client.fetch(byIdQuery, { ids });
  } catch (error) {
    console.error("getProductsByIds error:", error);
    return [];
  }
}
