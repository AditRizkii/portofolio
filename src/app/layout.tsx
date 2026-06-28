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

const siteUrl = "https://adityarizki.dev";
const siteName = "Aditya Rizki Ramadhan";
const defaultDescription =
  "Full Stack Developer & Informatics student at Universitas Syiah Kuala. Building full-stack web and mobile experiences with React, Next.js, Node.js, and Kotlin.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "Node.js",
    "Kotlin",
    "TypeScript",
    "Web Development",
    "Mobile Development",
    "Portfolio",
    "Aditya Rizki",
  ],
  authors: [{ name: "Aditya Rizki Ramadhan", url: siteUrl }],
  creator: "Aditya Rizki Ramadhan",
  publisher: "Aditya Rizki Ramadhan",
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
  manifest: "/manifest.json",
  openGraph: {
    type: "profile",
    title: siteName,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    locale: "en_US",
    firstName: "Aditya Rizki",
    lastName: "Ramadhan",
    username: "AditRizkii",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
    images: ["/og-image.svg"],
    creator: "@aditrizkii",
  },
  category: "technology",
  classification: "Portfolio",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080810" },
    { media: "(prefers-color-scheme: light)", color: "#F2F2F7" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteName,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Aditya Rizki Ramadhan",
      url: siteUrl,
      jobTitle: "Full Stack Developer",
      description: defaultDescription,
      email: "adityarizkiramadhan2@gmail.com",
      image: `${siteUrl}/og-image.svg`,
      sameAs: [
        "https://github.com/AditRizkii",
        "https://www.linkedin.com/in/aditrizkii/",
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "JavaScript",
        "Kotlin",
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "TailwindCSS",
        "Express",
        "Figma",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Universitas Syiah Kuala",
      },
    },
    {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      description: defaultDescription,
      author: { "@type": "Person", name: "Aditya Rizki Ramadhan" },
    },
    {
      "@type": "WebApplication",
      name: "Aditya Rizki Ramadhan — Portfolio",
      url: siteUrl,
      applicationCategory: "Portfolio",
      operatingSystem: "All",
      author: { "@type": "Person", name: "Aditya Rizki Ramadhan" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          syne.variable,
          inter.variable,
          firaCode.variable,
          "min-h-screen font-body antialiased",
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
