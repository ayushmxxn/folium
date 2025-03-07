import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

export const metadata: Metadata = {
  title: "Folium",
  description: "📄Build your portfolio and resume in minutes, then export them as a React component or PDF.",
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
  description:"📄Build your portfolio and resume in minutes, then export them as a React component or PDF.",
  url: "opengraph.jpeg",
  siteName: "Folium",
  locale: "en_US",
  type: "website",
  images: [
  {
  url: "opengraph.jpeg",
  width: 1200,
  height: 630,
  alt: "Folium",
  },
  ],
  },
  twitter: {
  card: "summary_large_image",
  creator: "Ayushmaan Singh",
  images: ["opengraph.jpeg"],
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
        <Analytics/>
      </body>
    </html>
  );
}
