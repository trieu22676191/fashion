"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import CartDrawer from "../CartDrawer/CartDrawer";
import SearchModal from "../SearchModal/SearchModal";
import { useCart } from "@/context/CartContext";

export default function Navbar({ categories = [] }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems, setIsCartOpen } = useCart();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
            <li className={styles.dropdown}>
              <Link href="/products" className={styles.dropdownToggle}>
                Sản Phẩm
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.dropdownIcon}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </Link>
              <ul className={styles.dropdownMenu}>
                <li><Link href="/products">Tất cả sản phẩm</Link></li>
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <Link href={`/categories/${cat.slug}`}>{cat.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className={styles.dropdown}>
              <Link href="/#collection" className={styles.dropdownToggle}>
                Bộ Sưu Tập
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.dropdownIcon}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </Link>
              <ul className={styles.dropdownMenu}>
                <li><Link href="/collections/noi-bat">Bộ sưu tập nổi bật</Link></li>
                <li><Link href="/collections/mua-he">Bộ sưu tập mùa hè</Link></li>
                <li><Link href="/collections/mua-dong">Bộ sưu tập mùa đông</Link></li>
              </ul>
            </li>
            <li><Link href="/#about">Về Chúng Tôi</Link></li>
            <li><Link href="/contact">Liên Hệ</Link></li>
          </ul>

          <div className={styles.actions}>
            <button className={styles.iconBtn} aria-label="Tìm kiếm" onClick={() => setIsSearchOpen(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button className={styles.iconBtn} aria-label="Giỏ hàng" onClick={() => setIsCartOpen(true)}>
              <div className={styles.cartIconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {cartItemCount > 0 && (
                  <span className={styles.cartBadge}>{cartItemCount}</span>
                )}
              </div>
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
          {categories.length > 0 ? (
            categories.map((cat) => (
              <li key={cat._id}>
                <Link href={`/categories/${cat.slug}`} onClick={toggleSidebar}>
                  {cat.title}
                </Link>
              </li>
            ))
          ) : (
            <>
              <li><Link href="/categories/ao" onClick={toggleSidebar}>Áo</Link></li>
              <li><Link href="/categories/quan" onClick={toggleSidebar}>Quần</Link></li>
              <li><Link href="/categories/phu-kien" onClick={toggleSidebar}>Phụ Kiện</Link></li>
            </>
          )}
        </ul>
      </div>

      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
