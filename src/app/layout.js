import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-primary" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-secondary" });

export const metadata = {
  title: "LUMIÈRE | Sang trọng & Tinh tế",
  description: "Khám phá bộ sưu tập thời trang cao cấp mới nhất từ LUMIÈRE. Phong cách tối giản, sang trọng.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
