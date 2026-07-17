import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProductGallery from "@/components/ProductGallery/ProductGallery";
import ProductInfo from "@/components/ProductInfo/ProductInfo";
import ProductCard from "@/components/ProductCard/ProductCard";
import { getProductBySlug, getCollections } from "@/lib/sanityQueries";
import styles from "./page.module.css";

// SSG: Generate params for all products
export async function generateStaticParams() {
  const collections = await getCollections();
  const params = [];
  for (const col of collections) {
    if (col.products) {
      col.products.forEach(product => {
        if (product.id) params.push({ slug: product.id }); // product.id is mapped to slug.current from groq
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    return { title: "Không tìm thấy sản phẩm | LUMIÈRE" };
  }

  return {
    title: `${product.name} | LUMIÈRE`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Fetch related products data (Sanity GROQ query already populated this)
  const relatedProductsData = product.relatedProducts || [];

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={`container ${styles.productContainer}`}>
          
          {/* Left Column: Image Gallery */}
          <div className={styles.gallerySection}>
            <ProductGallery images={product.images} />
          </div>

          {/* Right Column: Product Info & Interactive Elements */}
          <div className={styles.infoSection}>
            <ProductInfo product={product} relatedProducts={relatedProductsData} />
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProductsData && relatedProductsData.length > 0 && (
          <section className={`container ${styles.relatedSection}`}>
            <h2 className="heading-secondary text-center">Có thể bạn sẽ quan tâm</h2>
            <div className={styles.relatedGrid}>
              {relatedProductsData.map((prod) => (
                <ProductCard key={prod.id} {...prod} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
