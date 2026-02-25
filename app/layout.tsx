import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tangdrew.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Andrew Tang",
    template: "%s | Andrew Tang",
  },
  description: "Personal website of Andrew Tang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable}`}
    >
      <body className="antialiased tracking-tight bg-stone-50 dark:bg-[#0c0a09] text-stone-900 dark:text-stone-200 selection:bg-teal-100 dark:selection:bg-teal-900/30">
        <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8">
          <main className="max-w-[60ch] mx-auto w-full space-y-6 font-sans">
            {children}
          </main>
          <Footer />
          <Analytics />
        </div>
      </body>
    </html>
  );
}

function Footer() {
  const links = [
    { name: "github", url: "https://github.com/tangdrew" },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/in/andrew-tang-033a6088/",
    },
  ];

  return (
    <footer className="mt-12 text-center">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 dark:text-stone-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 font-sans"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
