"use client";

import { useState } from "react";
import styles from "./ProductGallery.module.css";

export default function ProductGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className={styles.gallery}>
      {/* Main Image */}
      <div className={styles.mainImageContainer}>
        <img 
          src={images[currentIndex]} 
          alt="Product details" 
          className={styles.mainImage} 
        />
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
