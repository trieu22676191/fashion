import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProductCard from "@/components/ProductCard/ProductCard";
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
            {category.description && <p className={styles.sectionDesc}>{category.description}</p>}
          </div>
          <div className={styles.grid}>
            {category.products && category.products.length > 0 ? (
              category.products.map(product => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <p style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem' }}>
                Hiện chưa có sản phẩm nào trong danh mục này.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
