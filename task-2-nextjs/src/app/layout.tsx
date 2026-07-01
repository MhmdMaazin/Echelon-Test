import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Echelon News",
  description: "Top US headlines and USD country data",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen bg-white text-gray-900">
        <header className="border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-8">
            <Link href="/" className="text-lg font-bold tracking-tight hover:opacity-70 transition-opacity">
              Echelon News
            </Link>
            <Link href="/countries" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              USD Countries
            </Link>
          </nav>
        </header>
        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
