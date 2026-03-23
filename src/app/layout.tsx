import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "FieldPro Marketing",
  description: "لوحة التحكم الميدانية للمسوقين",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${inter.variable} ${tajawal.variable} antialiased`}
    >
      <   <body className={`${inter.variable} ${tajawal.variable} bg-gray-100 font-sans`}>
        <main className="max-w-[450px] mx-auto min-h-screen bg-white shadow-2xl relative">
          {children}
        </main>
      </body>
