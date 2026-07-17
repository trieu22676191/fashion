"use client";

import { useState, useRef } from "react";
import { useCart } from "@/context/CartContext";
import styles from "./CartDrawer.module.css";
import html2canvas from "html2canvas";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const invoiceRef = useRef(null);
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);

  const generateInvoice = async () => {
    if (!invoiceRef.current) return;
    try {
      setIsGeneratingInvoice(true);
      
      // We need to temporarily make it visible to render it properly
      const el = invoiceRef.current;
      el.style.display = "block";
      
      const canvas = await html2canvas(el, { scale: 2 });
      const image = canvas.toDataURL("image/png", 1.0);
      
      el.style.display = "none";

      // Download the image
      const link = document.createElement("a");
      link.download = `hoadon-lumiere-${new Date().getTime()}.png`;
      link.href = image;
      link.click();

      // Clear the cart after successful generation
      clearCart();
    } catch (error) {
      console.error("Error generating invoice", error);
      alert("Đã có lỗi xảy ra khi tạo hóa đơn.");
    } finally {
      setIsGeneratingInvoice(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={() => setIsCartOpen(false)}></div>
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2>GIỎ HÀNG</h2>
          <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          {cartItems.length === 0 ? (
            <p className={styles.emptyMessage}>Giỏ hàng của bạn đang trống.</p>
          ) : (
            <ul className={styles.itemList}>
              {cartItems.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.itemImage}>
                    <img src={item.images?.[0] || "/placeholder.jpg"} alt={item.name} />
                  </div>
                  <div className={styles.itemDetails}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <p className={styles.itemPrice}>{item.price}</p>
                    <div className={styles.quantityControl}>
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                    Xóa
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <span>TỔNG CỘNG:</span>
              <span>{cartTotal.toLocaleString("vi-VN")} ₫</span>
            </div>
            <div className={styles.actionButtons}>
              <button 
                className={styles.invoiceBtn} 
                onClick={generateInvoice}
                disabled={isGeneratingInvoice}
              >
                {isGeneratingInvoice ? "ĐANG TẠO..." : "TẠO HÓA ĐƠN"}
              </button>
              <a href="https://zalo.me/" target="_blank" rel="noreferrer" className={styles.checkoutBtn}>
                THANH TOÁN (LIÊN HỆ MUA HÀNG)
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Hidden Invoice Template */}
      <div 
        ref={invoiceRef} 
        className={styles.invoiceTemplate}
      >
        <div className={styles.invoiceHeader}>
          <h2>LUMIÈRE</h2>
          <p>HÓA ĐƠN MUA HÀNG</p>
          <p>Ngày: {new Date().toLocaleDateString("vi-VN")}</p>
        </div>
        <table className={styles.invoiceTable}>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>SL</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              const priceNum = parseInt(item.price.replace(/[^\d]/g, ""), 10) || 0;
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{(priceNum * item.quantity).toLocaleString("vi-VN")} ₫</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.invoiceTotal}>
          <strong>TỔNG CỘNG: </strong>
          <strong>{cartTotal.toLocaleString("vi-VN")} ₫</strong>
        </div>
        <div className={styles.invoiceFooter}>
          <p>Cảm ơn quý khách đã mua sắm tại LUMIÈRE!</p>
        </div>
      </div>
    </>
  );
}
