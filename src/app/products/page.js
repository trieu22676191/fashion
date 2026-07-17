import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProductCard from "@/components/ProductCard/ProductCard";
import { getAllProducts } from "@/lib/sanityQueries";
import styles from "../collections/[slug]/page.module.css";

export const metadata = {
  title: "Tất cả sản phẩm | LUMIÈRE",
  description: "Khám phá tất cả các sản phẩm thời trang cao cấp tại LUMIÈRE.",
};

export default async function AllProductsPage() {
  const products = await getAllProducts();

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={`container ${styles.section}`}>
          <div className="text-center">
            <h1 className="heading-secondary">Tất Cả Sản Phẩm</h1>
            <p className={styles.sectionDesc}>Khám phá bộ sưu tập đầy đủ của LUMIÈRE.</p>
          </div>
          <div className={styles.grid}>
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <p style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem' }}>
                Hiện chưa có sản phẩm nào.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
