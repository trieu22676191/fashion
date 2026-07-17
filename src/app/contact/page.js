"use client";

import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Đã gửi yêu cầu tư vấn thành công! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.");
    e.target.reset();
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      <main className={styles.mainContainer}>
        <div className={styles.header}>
          <h1>Chúng tôi luôn sẵn sàng hỗ trợ</h1>
          <p>Nếu bạn có bất kỳ câu hỏi hoặc cần tư vấn về các sản phẩm và dịch vụ của chúng tôi. Vui lòng liên hệ với chúng tôi.</p>
        </div>

        <div className={styles.contentGrid}>
          {/* Left Column: Form */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>GỬI YÊU CẦU TƯ VẤN</h2>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label>Họ và tên <span>*</span></label>
                <input type="text" placeholder="Nguyễn Văn A" required />
              </div>

              <div className={styles.formGroup}>
                <label>Số điện thoại <span>*</span></label>
                <input type="tel" placeholder="0123 456 789" required />
              </div>

              <div className={styles.formGroup}>
                <label>Email <span>*</span></label>
                <input type="email" placeholder="email@example.com" required />
              </div>

              <div className={styles.formGroup}>
                <label>Nội dung tư vấn</label>
                <textarea placeholder="Cho chúng tôi biết về nhu cầu của bạn..." rows="5"></textarea>
              </div>

              <button type="submit" className={styles.submitBtn}>Gửi yêu cầu →</button>
            </form>
          </div>

          {/* Right Column: Info & Map */}
          <div className={styles.infoSection}>
            <div className={styles.infoBox}>
              <h2 className={styles.sectionTitle}>THÔNG TIN LIÊN HỆ</h2>
              <h3 className={styles.companyName}>LUMIÈRE FASHION</h3>
              
              <div className={styles.infoItem}>
                <h4>ĐỊA CHỈ</h4>
                <p>616/61/11D Lê Đức Thọ, Phường An Hội Đông, TP.Hồ Chí Minh</p>
              </div>
              
              <div className={styles.infoItem}>
                <h4>ĐIỆN THOẠI / ZALO</h4>
                <p>(+84) 362 356 676</p>
              </div>
            </div>

            <div className={styles.mapContainer}>
              <p className={styles.mapLabel}>Vị trí trên bản đồ</p>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5596969252574!2d106.67043337481913!3d10.844968389308017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529ad80d6f89d%3A0xe510d5dcfdb89b34!2zSOG6u20vNjE2IMSQLiBMw6ogxJDhu6ljIFRo4buNLCBBbiBI4buZaSDEkMO0bmcsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1784310844302!5m2!1svi!2s" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ LUMIÈRE"
              ></iframe>
              <p className={styles.mapAddress}>616/61/11D Lê Đức Thọ, Phường An Hội Đông, TP.Hồ Chí Minh</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
