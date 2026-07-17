import Navbar from "../Navbar/Navbar";
import { getAllCategories } from "@/lib/sanityQueries";

export default async function Header() {
  const categories = await getAllCategories();
  
  return <Navbar categories={categories || []} />;
}
