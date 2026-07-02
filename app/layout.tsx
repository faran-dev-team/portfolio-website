import type { Metadata } from "next";
import { Inter, Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import SmoothScrolling from "@/components/ui/SmoothScrolling";
import CustomCursor from "@/components/ui/CustomCursor";
import GravityField from "@/components/ui/GravityField";
import PageTransitionWrapper from "@/components/ui/PageTransitionWrapper";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-mono",
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
      className={`${inter.variable} ${fraunces.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-accent selection:text-black">
        <CustomCursor />
        <GravityField />
        <SmoothScrolling>
          <Navbar />
          <PageTransitionWrapper>
            {children}
          </PageTransitionWrapper>
        </SmoothScrolling>
      </body>
    </html>
  );
}
