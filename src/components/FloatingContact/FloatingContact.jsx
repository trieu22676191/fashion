import styles from "./FloatingContact.module.css";

export default function FloatingContact() {
  return (
    <div className={styles.floatingContainer}>
      <a href="https://m.me/" target="_blank" rel="noreferrer" className={styles.iconBtn} aria-label="Liên hệ Facebook">
        <svg viewBox="0 0 24 24" fill="#1877F2" width="40" height="40">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>
      <a href="https://zalo.me/" target="_blank" rel="noreferrer" className={styles.iconBtn} aria-label="Liên hệ Zalo">
        <svg viewBox="0 0 24 24" fill="#0068FF" width="40" height="40">
          <circle cx="12" cy="12" r="12" />
          <text x="12" y="16.5" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Zalo</text>
        </svg>
      </a>
      <a href="tel:0987654321" className={styles.iconBtn} aria-label="Gọi điện thoại">
        <svg viewBox="0 0 24 24" fill="#00C700" width="40" height="40">
          <circle cx="12" cy="12" r="12" />
          <path fill="white" d="M16.5 13.5c-.7-.7-1.7-.7-2.4 0l-1 1c-1.8-.8-3.4-2.4-4.2-4.2l1-1c.7-.7.7-1.7 0-2.4l-2.4-2.4c-.7-.7-1.7-.7-2.4 0l-.6.6c-.6.6-.9 1.5-.7 2.4.6 3.1 2.8 5.9 5.6 7.6 1.8 1 3.9 1.4 5.9 1.2.9-.1 1.7-.5 2.2-1.2l.6-.6c.7-.7.7-1.7 0-2.4l-2.4-2.4z"/>
        </svg>
      </a>
    </div>
  );
}
