import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Check the Charts — Data Literacy Project",
  description:
    "An educational web app that teaches critical thinking about economic data through interactive exploration of trends since 1971.",
  openGraph: {
    title: "Check the Charts — Data Literacy Project",
    description:
      "Interactive economic charts with multi-causal analysis. Turn viral chart propaganda into a teaching moment for statistical literacy.",
    type: "website",
    url: "https://checkthecharts.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "Check the Charts — Data Literacy Project",
    description:
      "Interactive economic charts with multi-causal analysis. Turn viral chart propaganda into a teaching moment for statistical literacy.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </head>
      <body
        className={`${fraunces.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pb-20 sm:pb-0">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
