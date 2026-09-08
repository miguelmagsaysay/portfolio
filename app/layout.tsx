import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
  weight: ["500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Miguel, Software Builder",
  description:
    "Software builder in the Philippines. Websites that bring local businesses more customers.",
  openGraph: {
    title: "Miguel, Software Builder",
    description:
      "Software builder in the Philippines. Websites that bring local businesses more customers.",
    type: "website",
    locale: "en_US",
    siteName: "Miguel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miguel, Software Builder",
    description:
      "Software builder in the Philippines. Websites that bring local businesses more customers.",
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
      className={`${outfit.variable} ${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen font-body antialiased">{children}</body>
    </html>
  );
}
