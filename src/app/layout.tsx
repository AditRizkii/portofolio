import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adityarizki.dev"),
  title: {
    default: "Aditya Rizki Ramadhan",
    template: "%s | Aditya Rizki Ramadhan",
  },
  description:
    "Full stack web developer & UI/UX designer. Informatics student at Universitas Syiah Kuala. Building web and mobile experiences that make an impact.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aditya Rizki Ramadhan",
    description:
      "Full stack web developer & UI/UX designer. Informatics student at Universitas Syiah Kuala.",
    url: "https://aditrizkii.vercel.app",
    siteName: "Aditya Rizki Ramadhan",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Rizki Ramadhan",
    description:
      "Full stack web developer & UI/UX designer. Informatics student at Universitas Syiah Kuala.",
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
          jakarta.variable,
          "min-h-screen bg-bg font-body text-text-primary antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}
