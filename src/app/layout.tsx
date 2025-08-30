import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Erick Karki - Full-Stack Software Engineer",
  description: "Full-stack software engineer specializing in cloud infrastructure, scalable systems, and AI-powered solutions. Expert in AWS, GCP, React, Node.js, and Spring Boot.",
  keywords: ["software engineer", "full-stack developer", "cloud infrastructure", "AWS", "GCP", "React", "Node.js", "Spring Boot", "AI/ML"],
  authors: [{ name: "Erick Karki" }],
  creator: "Erick Karki",
  openGraph: {
    title: "Erick Karki - Full-Stack Software Engineer",
    description: "Full-stack software engineer specializing in cloud infrastructure, scalable systems, and AI-powered solutions.",
    url: "https://erickkarki.dev",
    siteName: "Erick Karki Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erick Karki - Full-Stack Software Engineer",
    description: "Full-stack software engineer specializing in cloud infrastructure, scalable systems, and AI-powered solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
