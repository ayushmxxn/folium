import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/animation/SmoothScroll";

export const metadata: Metadata = {
  title: "Folium",
  description: "Build your portfolio and resume in minutes. Export as a React component or PDF.",
  metadataBase: new URL("https://folium-ayushmxxn-projects.vercel.app/"),
  keywords: [
  "portfolio builder",
  "online portfolio maker",
  "website portfolio generator",
  "personal website creator",
  "digital portfolio tool",
  "portfolio website builder",
  "developer portfolio builder",
  "designer portfolio maker",
  "freelancer website generator",
  "creative portfolio builder",
  "portfolio template generator",
  "no-code portfolio builder",
  "best portfolio builder for developers",
  "easy portfolio website creator",
  "free online portfolio maker",
  "portfolio builder for designers",
  "modern portfolio site generator",
  "resume builder",
  "online resume creator",
  "resume website generator",
  "digital resume maker",
  "professional resume creator",
  "best resume builder for developers",
  "resume builder for designers",
  "modern resume website",
  "one-page resume generator",
  "CV and portfolio website"
  ],
  authors: [{ name: "Ayushmaan Singh", url: "https://folium-ayushmxxn-projects.vercel.app/" }],
  creator: "Ayushmaan Singh",
  publisher: "Folium",
  alternates: {
  canonical: "/",
  languages: {
  "en-US": "/en-US",
  },
  },
  openGraph: {
  title: "Folium",
  description:
  "Build your portfolio and resume in minutes. Export as a React component or PDF.",
  url: "opengraph.png",
  siteName: "Folium",
  locale: "en_US",
  type: "website",
  images: [
  {
  url: "opengraph.png",
  width: 1200,
  height: 630,
  alt: "Folium",
  },
  ],
  },
  twitter: {
  card: "summary_large_image",
  creator: "Ayushmaan Singh",
  images: ["opengraph.png"],
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
        <SmoothScroll/>
        {children}
      </body>
    </html>
  );
}
