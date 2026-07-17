"use client";

import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";

export default function ProductList({ products }) {
  const [sortOrder, setSortOrder] = useState("default"); // 'default', 'price-asc', 'price-desc'

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

  return (
    <div className={styles.container}>
      <div className={styles.filterBar}>
        <div className={styles.filterCount}>
          Hiển thị <strong>{sortedProducts.length}</strong> sản phẩm
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
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
