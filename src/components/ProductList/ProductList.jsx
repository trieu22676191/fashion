"use client";

import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";

const ITEMS_PER_PAGE = 8;

export default function ProductList({ products }) {
  const [sortOrder, setSortOrder] = useState("default"); // 'default', 'price-asc', 'price-desc'
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when sort order changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder]);

  if (!products || products.length === 0) {
    return (
      <p style={{ textAlign: "center", padding: "2rem" }}>
        Hiện chưa có sản phẩm nào.
      </p>
    );
  }

  // Clone the array before sorting to avoid mutating the original prop
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "price-asc") {
      return a.price - b.price;
    }
    if (sortOrder === "price-desc") {
      return b.price - a.price;
    }
    return 0; // 'default'
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <div className={styles.filterBar}>
        <div className={styles.filterCount}>
          Hiển thị <strong>{paginatedProducts.length}</strong> / <strong>{sortedProducts.length}</strong> sản phẩm
        </div>
        <div className={styles.sortOptions}>
          <label htmlFor="sort">Sắp xếp theo:</label>
          <select 
            id="sort" 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            className={styles.selectBox}
          >
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá: Từ thấp đến cao</option>
            <option value="price-desc">Giá: Từ cao đến thấp</option>
          </select>
        </div>
      </div>

      <div className={styles.grid}>
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className={styles.pageBtn}
          >
            Trước
          </button>
          
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`${styles.pageNumberBtn} ${currentPage === i + 1 ? styles.activePage : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className={styles.pageBtn}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}
