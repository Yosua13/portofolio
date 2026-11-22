import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yosuareynaldi.dev"),
  title: "Yosua Reynaldi M. | Fullstack Software Engineer & Digital Solutions",
  description: "Professional portfolio of Yosua Reynaldi M., a Fullstack Software Engineer specializing in business digitalization (Company Profile, E-Commerce, POS, Custom Web/Mobile Apps) and enterprise backend systems using Go, Java, Spring Boot, and Next.js.",
  keywords: ["Yosua Reynaldi Manurun", "Software Engineer", "Fullstack Developer", "Backend Developer", "Java Developer", "Spring Boot", "Go", "Next.js", "Digitalisasi UMKM", "Jasa Website", "POS", "E-Commerce", "Bandung", "Indonesia", "YRM Portfolio"],
  authors: [{ name: "Yosua Reynaldi M." }],
  openGraph: {
    title: "Yosua Reynaldi M. | Fullstack Software Engineer & Digital Solutions",
    description: "I build scalable backend systems, custom business applications (Company Profile, E-Commerce, POS), and modern web platforms using Java, Spring Boot, Golang, React, and Next.js.",
    url: "https://yosuareynaldi.dev",
    siteName: "YRM Portfolio",
    images: [
      {
        url: "/assets/images/profile/yosua-profile.png",
        width: 800,
        height: 800,
        alt: "Yosua Reynaldi M. Profile Picture",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yosua Reynaldi M. | Fullstack Software Engineer & Digital Solutions",
    description: "Building scalable enterprise systems and digital solutions for SMEs & corporations.",
    images: ["/assets/images/profile/yosua-profile.png"],
  },
  icons: {
    icon: "/assets/images/brand/app-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
