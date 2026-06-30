import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import SmoothScrolling from "@/components/ui/SmoothScrolling";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Measm. | Climate-Tech Entrepreneur & Global Impact Builder",
  description: "Transforming ideas into ventures, research, and initiatives that create measurable global change through entrepreneurship, AI innovation, policy advocacy, and youth empowerment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-accent selection:text-black">
        <SmoothScrolling>
          <Navbar />
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
