import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.column}>
          <h4 className={styles.title}>LUMIÈRE</h4>
          <p className={styles.text}>Khám phá vẻ đẹp đích thực qua từng bộ sưu tập thời trang cao cấp. Phong cách tối giản, tôn vinh nét đẹp thanh lịch của bạn.</p>
        </div>
        <div className={styles.column}>
          <h4 className={styles.title}>Liên Kết</h4>
          <ul className={styles.links}>
            <li><a href="#collection">Bộ Sưu Tập Mới</a></li>
            <li><a href="#about">Câu Chuyện Thương Hiệu</a></li>
            <li><a href="#">Chính Sách Khách Hàng</a></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4 className={styles.title}>Theo Dõi Chúng Tôi</h4>
          <ul className={styles.links}>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Pinterest</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} LUMIÈRE. All rights reserved.</p>
      </div>
    </footer>
  );
}
