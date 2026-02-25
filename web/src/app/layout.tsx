import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
  title: "Typer — The app that types so you don't have to",
  description:
    "A cross-platform desktop app that simulates real keyboard input to bypass paste-blocking on exam platforms. macOS, Windows, Linux.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Typer",
    description: "The app that types so you don't have to.",
    url: "https://github.com/vishesh-sachan/typer",
    siteName: "Typer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Typer",
    description: "The app that types so you don't have to.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
