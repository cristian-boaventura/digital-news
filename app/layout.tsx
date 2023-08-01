import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components";
import { Providers } from "@/store/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "News Digital",
  description: "Your Worlwide News Resource",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar>{children}</Navbar>
        </Providers>
      </body>
    </html>
  );
}
