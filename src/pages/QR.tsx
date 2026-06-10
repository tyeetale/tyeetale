import { Helmet } from "react-helmet-async";
import { QRCodeSVG } from "qrcode.react";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function QR() {
  const siteUrl = "https://tyeetale.vercel.app";

  return (
    <>
      <Helmet>
        <title>QR — tyeetale</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Container>
        <Header />
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-muted text-sm hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          back
        </Link>
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <QRCodeSVG
            value={siteUrl}
            size={200}
            bgColor="transparent"
            fgColor="currentColor"
            className="text-foreground"
          />
          <p className="text-muted text-sm">Scan to visit tyeetale.vercel.app</p>
        </div>
      </Container>
    </>
  );
}
