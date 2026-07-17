import { createClient, groq } from "next-sanity";

// Configure Sanity Client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-10-01",
  useCdn: false, // Set to false to ensure fresh data during development
});

// Queries

// Get all collections
export const getCollectionsQuery = groq`
  *[_type == "collection"] {
    _id,
    title,
    "slug": slug.current,
    description,
    "products": *[_type == "product" && references(^._id)] | order(_createdAt asc) {
      _id,
      "id": coalesce(slug.current, _id),
      name,
      price,
      "images": images[].asset->url,
      description,
      color
    }
  }
`;

// Get a single collection by slug
export const getCollectionBySlugQuery = groq`
  *[_type == "collection" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "products": *[_type == "product" && references(^._id)] | order(_createdAt asc) {
      _id,
      "id": coalesce(slug.current, _id),
      name,
      price,
      "images": images[].asset->url,
      description,
      color
    }
  }
`;

// Get a single product by Slug
export const getProductBySlugQuery = groq`
  *[_type == "product" && (slug.current == $slug || _id == $slug)][0] {
    _id,
    "id": coalesce(slug.current, _id),
    name,
    price,
    "images": images[].asset->url,
    description,
    color,
    sizeGuide,
    careDetails,
    "relatedProducts": relatedProducts[]->{
      _id,
      "id": coalesce(slug.current, _id),
      name,
      price,
      "images": images[].asset->url
    }
  }
`;

// Get all categories
export const getCategoriesQuery = groq`
  *[_type == "category"] {
    _id,
    title,
    "slug": slug.current,
    description
  }
`;

// Get a single category by slug and its products
export const getCategoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "products": *[_type == "product" && references(^._id)] | order(_createdAt asc) {
      _id,
      "id": coalesce(slug.current, _id),
      name,
      price,
      "images": images[].asset->url,
      description,
      color
    }
  }
`;

// Get all products
export const getAllProductsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    "id": coalesce(slug.current, _id),
    name,
    price,
    "images": images[].asset->url,
    description,
    color
  }
`;

// API Functions
export async function getCollections() {
  return await client.fetch(getCollectionsQuery);
}

export async function getCollectionBySlug(slug) {
  return await client.fetch(getCollectionBySlugQuery, { slug });
}

export async function getProductBySlug(slug) {
  return await client.fetch(getProductBySlugQuery, { slug });
}

export async function getAllCategories() {
  return await client.fetch(getCategoriesQuery);
}

export async function getCategoryBySlug(slug) {
  return await client.fetch(getCategoryBySlugQuery, { slug });
}

export async function getAllProducts() {
  return await client.fetch(getAllProductsQuery);
}
