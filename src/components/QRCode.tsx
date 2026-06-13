import { QRCodeSVG } from "qrcode.react";

export default function QRCode() {
  return (
    <QRCodeSVG
      value="https://tyeetale.vercel.app"
      size={200}
      bgColor="transparent"
      fgColor="currentColor"
      className="text-foreground"
    />
  );
}
