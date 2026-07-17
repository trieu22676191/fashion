"use client";

import { useState } from "react";
import Link from "next/link";
import SideDrawer from "../SideDrawer/SideDrawer";
import styles from "./ProductInfo.module.css";

export default function ProductInfo({ product, relatedProducts }) {
  const [activeDrawer, setActiveDrawer] = useState(null); // 'size' or 'care'

  const openDrawer = (drawerName) => setActiveDrawer(drawerName);
  const closeDrawer = () => setActiveDrawer(null);

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
        
        <button className={styles.addToCartBtn}>THÊM VÀO GIỎ HÀNG</button>
        
        <div className={styles.description}>
          <p>{product.description}</p>
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

        <div className={styles.interactiveLinks}>
          <button className={styles.drawerTriggerBtn} onClick={() => openDrawer('size')}>
            KÍCH THƯỚC SẢN PHẨM
          </button>
          <button className={styles.drawerTriggerBtn} onClick={() => openDrawer('care')}>
            CHẤT LIỆU, CÁCH CHĂM SÓC & NGUỒN GỐC
          </button>
        </div>

        <div className={styles.extraLinks}>
          <p>KIỂM TRA TÌNH TRẠNG CÒN HÀNG TẠI CỬA HÀNG</p>
          <p>GỬI, ĐỔI VÀ HOÀN TRẢ HÀNG</p>
        </div>
      </div>

      {/* Size Drawer */}
      <SideDrawer 
        isOpen={activeDrawer === 'size'} 
        onClose={closeDrawer} 
        title="KÍCH THƯỚC SẢN PHẨM"
      >
        <p className={styles.drawerDesc}>Các số đo có thể sai số nhỏ do quá trình sản xuất. Sản phẩm được đo khi trải phẳng.</p>
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
      </SideDrawer>

      {/* Care Details Drawer */}
      <SideDrawer 
        isOpen={activeDrawer === 'care'} 
        onClose={closeDrawer} 
        title="CHẤT LIỆU, CÁCH CHĂM SÓC & NGUỒN GỐC"
      >
        {product.careDetails ? (
          <div className={styles.careContent}>
            <div className={styles.careSection}>
              <h4>CHẤT LIỆU</h4>
              <div className={styles.careItem}>
                <span>LỚP NGOÀI</span>
                <p>{product.careDetails.materialOuter || product.careDetails?.material?.outer}</p>
              </div>
              <div className={styles.careItem}>
                <span>LỚP LÓT</span>
                <p>{product.careDetails.materialInner || product.careDetails?.material?.inner}</p>
              </div>
            </div>

            <div className={styles.careSection}>
              <h4>CHĂM SÓC</h4>
              <p className={styles.drawerDesc}>Chăm sóc để kéo dài tuổi thọ quần áo của bạn.</p>
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
          </div>
        ) : (
          <p>Không có thông tin chi tiết cho sản phẩm này.</p>
        )}
      </SideDrawer>
    </>
  );
}
