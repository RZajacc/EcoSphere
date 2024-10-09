import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarMain from "@/_components/navigation/NavbarMain";
import Footer from "@/_components/navigation/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ecospehere",
  description: "A place for sustainable events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <NavbarMain />
        <main className="h-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
