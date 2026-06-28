import type { Metadata } from "next";
import { Syne, Inter, Fira_Code } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adityarizki.dev"),
  title: {
    default: "Aditya Rizki Ramadhan",
    template: "%s | Aditya Rizki Ramadhan",
  },
  description:
    "UI/UX Designer & Full Stack Developer. Informatics student at Universitas Syiah Kuala.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aditya Rizki Ramadhan",
    description:
      "UI/UX Designer & Full Stack Developer. Informatics student at Universitas Syiah Kuala.",
    url: "https://adityarizki.dev",
    siteName: "Aditya Rizki Ramadhan",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Rizki Ramadhan",
    description:
      "UI/UX Designer & Full Stack Developer. Informatics student at Universitas Syiah Kuala.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          syne.variable,
          inter.variable,
          firaCode.variable,
          "min-h-screen font-body antialiased"
        )}
      >
        <div className="blob blob-1" aria-hidden="true" />
        <div className="blob blob-2" aria-hidden="true" />
        <div className="blob blob-3" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
