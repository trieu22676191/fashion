"use server";

import { client } from "@/lib/sanityQueries";
import { groq } from "next-sanity";

export async function searchProducts(query) {
  if (!query || query.trim() === "") return [];
  
  const searchStr = `*${query.trim()}*`;
  
  const searchProductsQuery = groq`
    *[_type == "product" && name match $searchStr] | order(_createdAt desc) [0...10] {
      _id,
      "id": coalesce(slug.current, _id),
      name,
      price,
      "images": images[].asset->url,
      color
    }
  `;
  
  try {
    const results = await client.fetch(searchProductsQuery, { searchStr });
    return results;
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}
