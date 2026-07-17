import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact/FloatingContact";
import { CartProvider } from "@/context/CartContext";

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
          {children}
          <FloatingContact />
        </CartProvider>
      </body>
    </html>
  );
}
