"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SideDrawer from "@/components/SideDrawer/SideDrawer";
import { useChat } from "@/context/ChatContext";
import { useCart } from "@/context/CartContext";
import styles from "./ChatBox.module.css";

const SUGGESTIONS = [
  "Cửa hàng có sản phẩm mới nào không?",
  "Gợi ý trang phục đi tiệc",
  "Áo blazer giá bao nhiêu?",
  "Chính sách đổi trả thế nào?",
];

export default function ChatBox() {
  const { messages, isChatOpen, setIsChatOpen, isLoading, sendMessage, resetChat } = useChat();
  const { addToCart } = useCart();
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const isNewChat = messages.length === 1;

  return (
    <>
      <button
        className={styles.launcher}
        onClick={() => setIsChatOpen(true)}
        aria-label="Mở trợ lý AI"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
          <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
          <path d="M16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      </button>

      <SideDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} title="Trợ lý LUMIÈRE">
        <div className={styles.chatBody}>
          <div className={styles.toolbar}>
            <button
              type="button"
              className={styles.clearBtn}
              onClick={resetChat}
              disabled={isNewChat}
            >
              Xóa hội thoại
            </button>
          </div>

          <div className={styles.messageList} ref={listRef}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.messageRow} ${
                  msg.role === "user" ? styles.userRow : styles.assistantRow
                }`}
              >
                <div
                  className={`${styles.bubble} ${
                    msg.role === "user" ? styles.userBubble : styles.assistantBubble
                  }`}
                >
                  {msg.content}
                </div>

                {msg.products && msg.products.length > 0 && (
                  <div className={styles.productGrid}>
                    {msg.products.map((product) => (
                      <div key={product.id} className={styles.productCard}>
                        {product.images?.[0] && (
                          <img src={product.images[0]} alt={product.name} />
                        )}
                        <p className={styles.productName}>{product.name}</p>
                        <p className={styles.productPrice}>{product.price}</p>
                        <div className={styles.productActions}>
                          <Link
                            href={`/products/${product.id}`}
                            className={styles.detailBtn}
                            onClick={() => setIsChatOpen(false)}
                          >
                            Xem chi tiết
                          </Link>
                          <button
                            type="button"
                            className={styles.addBtn}
                            onClick={() => addToCart(product)}
                          >
                            Thêm vào giỏ
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isNewChat && !isLoading && (
              <div className={styles.suggestions}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={styles.suggestionChip}
                    onClick={() => sendMessage(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className={`${styles.messageRow} ${styles.assistantRow}`}>
                <div className={`${styles.bubble} ${styles.assistantBubble} ${styles.typing}`}>
                  Đang trả lời...
                </div>
              </div>
            )}
          </div>

          <form className={styles.inputRow} onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi về sản phẩm, gợi ý mua hàng..."
              className={styles.input}
              disabled={isLoading}
            />
            <button
              type="submit"
              className={styles.sendBtn}
              disabled={isLoading || !input.trim()}
            >
              Gửi
            </button>
          </form>
        </div>
      </SideDrawer>
    </>
  );
}
