import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./page.module.css";

const featuredProducts = [
  {
    id: 1,
    name: "Váy Lụa Mềm Mại",
    price: "1,250,000 ₫",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Áo Blazer Thanh Lịch",
    price: "2,100,000 ₫",
    imageUrl: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Túi Xách Da Cao Cấp",
    price: "3,500,000 ₫",
    imageUrl: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Giày Cao Gót Mũi Nhọn",
    price: "1,850,000 ₫",
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80",
  }
];

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className="heading-primary">Định Hình Phong Cách</h1>
            <p className={styles.heroText}>Khám phá bộ sưu tập Thu Đông 2026 với những thiết kế tối giản, thanh lịch và trường tồn với thời gian.</p>
            <a href="#collection" className={styles.btnPrimary}>Khám Phá Ngay</a>
          </div>
        </section>

        {/* Featured Collection */}
        <section id="collection" className={`container ${styles.section}`}>
          <div className="text-center">
            <h2 className="heading-secondary">Bộ Sưu Tập Nổi Bật</h2>
            <p className={styles.sectionDesc}>Những mẫu thiết kế được yêu thích nhất từ LUMIÈRE</p>
          </div>
          <div className={styles.grid}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <div className={styles.centerAction}>
            <button className={styles.btnOutline}>Xem Tất Cả Sản Phẩm</button>
          </div>
        </section>

        {/* About Us */}
        <section id="about" className={styles.about}>
          <div className={`container ${styles.aboutContainer}`}>
            <div className={styles.aboutImage}>
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=80" alt="Fashion Story" />
            </div>
            <div className={styles.aboutContent}>
              <h2 className="heading-secondary">Câu Chuyện Của LUMIÈRE</h2>
              <p>Thành lập từ năm 2026, LUMIÈRE mang đến sự thanh lịch thông qua những trang phục được cắt may tỉ mỉ. Chúng tôi tin rằng thời trang không chỉ là vẻ bề ngoài, mà còn là sự tự tin toát ra từ bên trong.</p>
              <p>Mỗi thiết kế đều được chăm chút kỹ lưỡng từ chất liệu cho đến đường kim mũi chỉ, đảm bảo mang lại trải nghiệm tuyệt vời nhất cho người mặc.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
