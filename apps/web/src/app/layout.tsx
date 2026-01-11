import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Nina - Writer & Creative",
    template: "%s | Nina",
  },
  description:
    "Personal website of Nina. Writing about career, life, and everything in between.",
  keywords: ["Nina", "blog", "personal website", "career", "life"],
  authors: [{ name: "Nina" }],
  creator: "Nina",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nina",
    title: "Nina - Writer & Creative",
    description:
      "Personal website of Nina. Writing about career, life, and everything in between.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nina - Writer & Creative",
    description:
      "Personal website of Nina. Writing about career, life, and everything in between.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-16 md:pt-20">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

// Add responsive padding to main content
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
