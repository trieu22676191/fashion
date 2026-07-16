import Image from "next/image";
import styles from "./ProductCard.module.css";

export default function ProductCard({ name, price, imageUrl }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {/* We use a standard img tag for simplicity and avoiding Next.js image domain config for now, but Next.js Image is better for production */}
        <img src={imageUrl} alt={name} className={styles.image} />
        <div className={styles.overlay}>
          <button className={styles.quickViewBtn}>Xem nhanh</button>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>{price}</p>
      </div>
    </div>
  );
}
