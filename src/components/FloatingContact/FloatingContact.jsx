import styles from "./FloatingContact.module.css";

export default function FloatingContact() {
  return (
    <div className={styles.fabContainer}>
      {/* Options that appear on hover */}
      <div className={styles.fabOptions}>
        {/* Facebook */}
        <a href="https://www.facebook.com/teerius" target="_blank" rel="noreferrer" className={styles.iconBtn} aria-label="Liên hệ Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
            <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7.5v4H10V22h4v-8.5z" />
          </svg>
        </a>

        {/* Zalo */}
        <a href="https://zalo.me/0362356676" target="_blank" rel="noreferrer" className={styles.iconBtn} aria-label="Liên hệ Zalo">
          <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
            <path d="M21.544 11.049c0-4.638-4.409-8.4-9.843-8.4-5.432 0-9.841 3.762-9.841 8.4 0 4.636 4.409 8.399 9.841 8.399.789 0 1.554-.08 2.29-.232l3.433 2.01c.299.176.666-.024.622-.369l-.364-2.82c1.777-1.402 2.862-3.328 2.862-5.488zm-13.882-1.92h3.292c.32 0 .58.261.58.582 0 .322-.26.582-.58.582h-1.916l2.122 2.502c.162.19.24.428.225.666a1.144 1.144 0 0 1-1.127.97h-3.29c-.322 0-.582-.262-.582-.583 0-.321.26-.582.582-.582h1.918l-2.126-2.503a1.08 1.08 0 0 1-.225-.665c0-.525.426-.949.953-.949h.174zm6.059 4.37h-.826a.582.582 0 0 1 0-1.164h.826c.321 0 .58-.261.58-.582v-.827a.582.582 0 0 1 1.164 0v.827c0 .963-.782 1.746-1.744 1.746zm0-4.37h-.826c-.962 0-1.744.783-1.744 1.747v.826a.582.582 0 0 1-1.164 0v-.826c0-.321.26-.582.582-.582h2.572a.582.582 0 0 1 0 1.163h-.58v.581h-.58v-.581zm2.324 2.572c0 .321-.26.582-.58.582h-.826v-1.164h.826c.32 0 .58.261.58.582z" />
          </svg>
        </a>
      </div>

      {/* Phone (Main Button) */}
      {/* Phone (Main Button) */}
      <button className={`${styles.iconBtn} ${styles.mainBtn}`} aria-label="Menu liên hệ">
        <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
          <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
        </svg>
      </button>
    </div>
  );
}
