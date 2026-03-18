import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quick Decision Helper — by PengPeng",
  description: "Stop overthinking. Let PengPeng decide for you.",
  openGraph: {
    title: "Quick Decision Helper",
    description: "Stop overthinking. Let PengPeng decide for you.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
