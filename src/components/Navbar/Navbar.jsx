"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={`container ${styles.navbarContent}`}>
          <div className={styles.leftSection}>
            {/* Hamburger Icon */}
            <button className={styles.hamburgerBtn} onClick={toggleSidebar} aria-label="Danh mục sản phẩm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className={styles.logo}>
              <Link href="/">LUMIÈRE</Link>
            </div>
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

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}

      {/* Sidebar / Drawer */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <h3>Danh mục</h3>
          <button className={styles.closeBtn} onClick={toggleSidebar} aria-label="Đóng">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <ul className={styles.categoryList}>
          <li><Link href="#ao" onClick={toggleSidebar}>Áo</Link></li>
          <li><Link href="#quan" onClick={toggleSidebar}>Quần</Link></li>
          <li><Link href="#phu-kien" onClick={toggleSidebar}>Phụ Kiện</Link></li>
        </ul>
      </div>
    </>
  );
}
