import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "~/components/theme/theme-provider";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const productSans = localFont({
  src: "../../public/fonts/ProductSans-Bold.ttf",
  variable: "--font-productsans",
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
      className={[inter.variable, productSans.variable].join(" ")}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
