import type { Metadata } from "next";
import "./globals.css";




export const metadata: Metadata = {
  title: "Folium",
  description: "Build your portfolio and resume in minutes. Effortlessly export as a React component or PDF.",
  metadataBase: new URL("https://homebasementma.com/"),
  keywords: [
  "basement finishing",
  "basement remodeling",
  ],
  authors: [{ name: "Claudinei Paulo", url: "https://homebasementma.com/" }],
  creator: "Claudinei Paulo",
  publisher: "Home Basement",
  alternates: {
  canonical: "/",
  languages: {
  "en-US": "/en-US",
  },
  },
  openGraph: {
  title: "Home Basement",
  description:
  "Expert basement finishing services delivering beautiful, functional spaces that add value to your home. Quality craftsmanship guaranteed.",
  url: "https://homebasementma.com/",
  siteName: "Home Basement",
  locale: "en_US",
  type: "website",
  images: [
  {
  url: "https://i.ibb.co/2YP7yFTV/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Home Basement - Basement Remodeling",
  },
  ],
  },
  twitter: {
  card: "summary_large_image",
  creator: "Claudinei Paulo",
  images: ["https://i.ibb.co/2YP7yFTV/opengraph-image.png"],
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
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
