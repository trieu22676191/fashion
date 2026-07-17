import Link from "next/link";
import FadeIn from "../FadeIn/FadeIn";
import styles from "./ProductCard.module.css";

export default function ProductCard({ id, name, price, images }) {
  // Use the first image for the card thumbnail
  const thumbnail = images && images.length > 0 ? images[0] : "";

  return (
    <FadeIn>
      <div className={styles.card}>
        <Link href={`/products/${id}`} className={styles.imageContainer}>
          {/* We use a standard img tag for simplicity and avoiding Next.js image domain config for now */}
          <img src={thumbnail} alt={name} className={styles.image} />
          <div className={styles.overlay}>
            <button className={styles.quickViewBtn}>Xem chi tiết</button>
          </div>
        </Link>
        <div className={styles.info}>
          <Link href={`/products/${id}`}>
            <h3 className={styles.name}>{name}</h3>
          </Link>
          <p className={styles.price}>{price}</p>
        </div>
      </div>
    </FadeIn>
  );
}
