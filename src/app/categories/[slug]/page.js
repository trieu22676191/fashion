import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProductList from "@/components/ProductList/ProductList";
import { getAllCategories, getCategoryBySlug } from "@/lib/sanityQueries";
import styles from "../../collections/[slug]/page.module.css";

// This is required for Next.js Static Site Generation (SSG) with dynamic routes
export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.slug);
  
  if (!category) {
    return {
      title: "Không tìm thấy danh mục | LUMIÈRE",
    };
  }

  return {
    title: `${category.title} | LUMIÈRE`,
    description: category.description || `Khám phá các sản phẩm thuộc danh mục ${category.title}`,
  };
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={`container ${styles.section}`}>
          <div className="text-center">
            <h1 className="heading-secondary">{category.title}</h1>
            <p className={styles.sectionDesc}>{category.description}</p>
          </div>
          
          <ProductList products={category.products || []} />
        </section>
      </main>
      <Footer />
    </>
  );
}
