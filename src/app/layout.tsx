import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Folium",
  description: "Build your portfolio and resume in minutes. Effortlessly export as a React component or PDF.",
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
