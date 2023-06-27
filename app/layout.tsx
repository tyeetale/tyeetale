import LocalFont from "@next/font/local";
import "../globals.css";
const productSansBold = LocalFont({
  src: "../public/fonts/ProductSans-Bold.ttf",
  variable: "--font-productsans-bold",
});

const productSansRegular = LocalFont({
  src: "../public/fonts/ProductSans-Regular.ttf",
  variable: "--font-productsans-regular",
});

export const metadata = {
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[productSansBold.variable, productSansRegular.variable].join(
        " "
      )}
    >
      <body>{children}</body>
    </html>
  );
}
