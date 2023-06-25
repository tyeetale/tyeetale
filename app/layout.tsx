import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import "../global.css";

export const metadata: Metadata = {
  title: {
    default: "tyeetale.vercel.app",
    template: "%s | tyeetale.vercel.app",
  },
  description: "developer + designer,  founder of tildenn.com",
  openGraph: {
    title: "tyeetale.vercel.app",
    description: "developer + designer,  founder of tildenn.com",
    url: "https://tyeetale.vercel.app",
    siteName: "tyeetale.vercel.app",
    images: [
      {
        url: "https://tyeetale.vercel.app/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
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
  twitter: {
    title: "Tyeetale",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <body
        className={` ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
      </body>
    </html>
  );
}
