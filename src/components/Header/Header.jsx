import Navbar from "../Navbar/Navbar";
import { getAllCategories, getCollections } from "@/lib/sanityQueries";

export default async function Header() {
  const [categories, collections] = await Promise.all([
    getAllCategories(),
    getCollections(),
  ]);

  return <Navbar categories={categories || []} collections={collections || []} />;
}
