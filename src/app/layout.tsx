import localFont from "next/font/local";
import { ThemeProvider } from "~/components/theme/theme-provider";
import "../styles/globals.css";

const productSans = localFont({
  src: [
    {
      path: "../../public/fonts/ProductSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ProductSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-productsans",
  display: "swap",
});

export const metadata = {
  title: {
    default: "tyeetale.vercel.app",
    template: "%s | tyeetale.vercel.app",
  },
  description: "developer + designer,  founder of tildenn.com",
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
  icons: {
    shortcut: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={productSans.variable}
    >
      <body className="min-h-screen bg-depth-surface text-industrial-900 antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
