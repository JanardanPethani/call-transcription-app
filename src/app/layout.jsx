import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import Navigation from "@/components/Navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Call Transcription",
  description: "Get transcription of your conversation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9821198488968811"
          crossOrigin="anonymous"
        ></Script>
        <meta
          name="google-adsense-account"
          content="ca-pub-9821198488968811"
        ></meta>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow container mx-auto max-w-4xl">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
