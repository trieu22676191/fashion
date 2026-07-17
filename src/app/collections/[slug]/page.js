import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProductList from "@/components/ProductList/ProductList";
import { getCollections, getCollectionBySlug } from "@/lib/sanityQueries";
import styles from "./page.module.css";

// This is required for Next.js Static Site Generation (SSG) with dynamic routes
export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((col) => ({
    slug: col.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const collection = await getCollectionBySlug(resolvedParams.slug);
  
  if (!collection) {
    return {
      title: "Không tìm thấy trang | LUMIÈRE",
    };
  }

  return {
    title: `${collection.title} | LUMIÈRE`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }) {
  const resolvedParams = await params;
  const collection = await getCollectionBySlug(resolvedParams.slug);

  if (!collection) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={`container ${styles.section}`}>
          <div className="text-center">
            <h1 className="heading-secondary">{collection.title}</h1>
            <p className={styles.sectionDesc}>{collection.description}</p>
          </div>
          
          <ProductList products={collection.products || []} />
        </section>
      </main>
      <Footer />
    </>
  );
}
