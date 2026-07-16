import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navbarContent}`}>
        <div className={styles.logo}>
          <Link href="/">LUMIÈRE</Link>
        </div>
        <ul className={styles.navLinks}>
          <li><Link href="#collection">Bộ Sưu Tập</Link></li>
          <li><Link href="#about">Về Chúng Tôi</Link></li>
          <li><Link href="#contact">Liên Hệ</Link></li>
        </ul>
        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Tìm kiếm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
