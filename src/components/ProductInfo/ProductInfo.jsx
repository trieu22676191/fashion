"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ProductInfo.module.css";
import { useCart } from "@/context/CartContext";

export default function ProductInfo({ product, relatedProducts }) {
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart } = useCart();

  return (
    <>
      <div className={styles.header}>
        <span className={styles.newLabel}>NEW</span>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.price}>{product.price}</p>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.details}>
        {product.color && (
          <p className={styles.colorInfo}>{product.color.toUpperCase()}</p>
        )}
        
        <div className={styles.actionButtons}>
          <button 
            className={styles.addToCartBtn} 
            onClick={() => addToCart(product)}
          >
            THÊM VÀO GIỎ HÀNG
          </button>
          <a href="https://zalo.me/" target="_blank" rel="noreferrer" className={styles.contactBtn}>
            LIÊN HỆ TƯ VẤN
          </a>
        </div>

        {/* Tabs Container */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabHeaders}>
            <button 
              className={`${styles.tabBtn} ${activeTab === "description" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Mô tả
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === "size" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("size")}
            >
              Kích thước
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === "material" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("material")}
            >
              Chất liệu
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === "care" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("care")}
            >
              Chăm sóc & Nguồn gốc
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "description" && (
              <div className={styles.description}>
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === "size" && (
              <div className={styles.tabSection}>
                <p className={styles.tabDesc}>Các số đo có thể sai số nhỏ do quá trình sản xuất. Sản phẩm được đo khi trải phẳng.</p>
                {product.sizeGuide ? (
                  <div className={styles.sizeTableContainer}>
                    <table className={styles.sizeTable}>
                      <thead>
                        <tr>
                          {product.sizeGuide.headers.map((h, i) => <th key={i}>{h}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {product.sizeGuide.rows.map((row, i) => (
                          <tr key={i}>
                            <td>{row.label}</td>
                            {row.values.map((v, idx) => <td key={idx}>{v}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>Không có thông tin kích thước cho sản phẩm này.</p>
                )}
              </div>
            )}

            {activeTab === "material" && (
              <div className={styles.tabSection}>
                {product.careDetails ? (
                  <div className={styles.careSection}>
                    <div className={styles.careItem}>
                      <span>LỚP NGOÀI</span>
                      <p>{product.careDetails.materialOuter || product.careDetails?.material?.outer || "Đang cập nhật"}</p>
                    </div>
                    <div className={styles.careItem}>
                      <span>LỚP LÓT</span>
                      <p>{product.careDetails.materialInner || product.careDetails?.material?.inner || "Đang cập nhật"}</p>
                    </div>
                  </div>
                ) : (
                  <p>Không có thông tin chất liệu cho sản phẩm này.</p>
                )}
              </div>
            )}

            {activeTab === "care" && (
              <div className={styles.tabSection}>
                {product.careDetails ? (
                  <>
                    <div className={styles.careSection}>
                      <h4>CHĂM SÓC</h4>
                      <p className={styles.tabDesc}>Chăm sóc để kéo dài tuổi thọ quần áo của bạn.</p>
                      <ul className={styles.careList}>
                        {(product.careDetails.careInstructions || product.careDetails?.care || []).map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.careSection}>
                      <h4>NGUỒN GỐC</h4>
                      <p>{product.careDetails.origin}</p>
                    </div>
                  </>
                ) : (
                  <p>Không có thông tin chăm sóc cho sản phẩm này.</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Hoàn thiện phong cách (Related Products) */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className={styles.relatedSection}>
            <h4 className={styles.sectionTitle}>HOÀN THIỆN PHONG CÁCH CỦA BẠN</h4>
            <div className={styles.relatedList}>
              {relatedProducts.map(rel => (
                <Link key={rel.id} href={`/products/${rel.id}`} className={styles.relatedItem}>
                  <img src={rel.images[0]} alt={rel.name} title={rel.name} />
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className={styles.extraLinks}>
          <p>KIỂM TRA TÌNH TRẠNG CÒN HÀNG TẠI CỬA HÀNG</p>
          <p>GỬI, ĐỔI VÀ HOÀN TRẢ HÀNG</p>
        </div>
      </div>
    </>
  );
}
