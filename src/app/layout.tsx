import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Yosua Reynaldi M. | Fullstack Software Engineer",
  description: "Professional portfolio of Yosua Reynaldi M., a Fullstack Software Engineer specializing in building scalable backend systems, database workflows, and clean user interfaces using Go, Java, Spring Boot, and Next.js.",
  keywords: ["Yosua Reynaldi Manurun", "Software Engineer", "Fullstack Developer", "Backend Developer", "Java Developer", "Spring Boot", "Go", "Next.js", "Bandung", "Indonesia", "YRM Portfolio"],
  authors: [{ name: "Yosua Reynaldi M." }],
  openGraph: {
    title: "Yosua Reynaldi M. | Fullstack Software Engineer",
    description: "I build scalable backend systems and modern web applications using Java, Spring Boot, Golang, Next.js, and TypeScript.",
    url: "https://yosuareynaldi.dev", // Replace with your production domain
    siteName: "YRM Portfolio",
    images: [
      {
        url: "/assets/images/profile/yosua-profile.png",
        width: 800,
        height: 800,
        alt: "Yosua Reynaldi M. Profile Picture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yosua Reynaldi M. | Fullstack Software Engineer",
    description: "I build scalable backend systems and modern web applications.",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
