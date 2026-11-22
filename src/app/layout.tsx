import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kevin Ding — Software Engineer",
  description:
    "Software Engineer @ Amazon · M.S. CS (Machine Learning) @ Georgia Tech. Creator of StressAlpha and PokéBastion TD.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&family=Geist:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-theaterBg text-iceWhite font-sans antialiased selection:bg-primeCyan selection:text-theaterBg">
        {children}
      </body>
    </html>
  );
}
