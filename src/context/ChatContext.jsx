"use client";

import { createContext, useContext, useState, useCallback } from "react";

const ChatContext = createContext();

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Xin chào! Mình là trợ lý của LUMIÈRE. Bạn cần tìm sản phẩm gì hôm nay?",
  products: [],
};

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMessage = { role: "user", content: trimmed };
      const nextMessages = [...messages, userMessage];
      setMessages(nextMessages);
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
            currentProduct,
          }),
        });

        if (!res.ok) throw new Error("Request failed");

        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply, products: data.products || [] },
        ]);
      } catch (err) {
        console.error("Chat error:", err);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Xin lỗi, trợ lý đang gặp sự cố. Vui lòng thử lại sau.",
            products: [],
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, currentProduct]
  );

  const resetChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isChatOpen,
        setIsChatOpen,
        isLoading,
        sendMessage,
        resetChat,
        setCurrentProduct,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
