import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact/FloatingContact";
import BackToTop from "@/components/BackToTop/BackToTop";
import ChatBox from "@/components/ChatBox/ChatBox";
import { CartProvider } from "@/context/CartContext";
import { ChatProvider } from "@/context/ChatContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-primary" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-secondary" });

export const metadata = {
  title: "LUMIÈRE | Thời trang cao cấp",
  description: "Thương hiệu thời trang tối giản và thanh lịch",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
        <CartProvider>
          <ChatProvider>
            {children}
            <FloatingContact />
            <BackToTop />
            <ChatBox />
          </ChatProvider>
        </CartProvider>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#000',
              color: '#fff',
              borderRadius: '4px',
              fontFamily: 'var(--font-primary)'
            },
            success: {
              iconTheme: {
                primary: '#fff',
                secondary: '#000',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
