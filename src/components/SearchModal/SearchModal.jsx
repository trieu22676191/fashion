"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { searchProducts } from "@/app/actions";
import styles from "./SearchModal.module.css";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length >= 2) {
        setIsSearching(true);
        const data = await searchProducts(query);
        setResults(data);
        setIsSearching(false);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modal}>
        <div className={styles.header}>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.closeBtn} onClick={onClose} aria-label="Đóng tìm kiếm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className={styles.content}>
          {isSearching ? (
            <p className={styles.message}>Đang tìm kiếm...</p>
          ) : query.length >= 2 && results.length === 0 ? (
            <p className={styles.message}>Không tìm thấy kết quả nào cho "{query}"</p>
          ) : (
            <ul className={styles.resultsList}>
              {results.map((product) => (
                <li key={product._id} className={styles.resultItem}>
                  <Link href={`/products/${product.id}`} onClick={onClose} className={styles.resultLink}>
                    <img src={product.images?.[0] || "/placeholder.jpg"} alt={product.name} className={styles.resultImg} />
                    <div className={styles.resultInfo}>
                      <p className={styles.resultName}>{product.name}</p>
                      <p className={styles.resultPrice}>{product.price}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
