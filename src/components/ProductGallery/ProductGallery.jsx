"use client";

import { useState } from "react";
import styles from "./ProductGallery.module.css";

export default function ProductGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.gallery}>
      {/* Main Image */}
      <div className={styles.mainImageContainer}>
        <img 
          src={images[currentIndex]} 
          alt="Product details" 
          className={styles.mainImage} 
        />
        
        {images.length > 1 && (
          <>
            <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevImage} aria-label="Ảnh trước">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextImage} aria-label="Ảnh tiếp theo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((img, index) => (
            <button 
              key={index} 
              className={`${styles.thumbnailBtn} ${currentIndex === index ? styles.active : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img src={img} alt={`Thumbnail ${index + 1}`} className={styles.thumbnailImg} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
