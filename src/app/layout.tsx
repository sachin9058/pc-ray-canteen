import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";
import RegisterUser from "@/components/RegisterUser"; // Move it to a separate client component
import Footer from "@/components/Footer";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InstaFood App",
  description: "Instant Food Delivery App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased pt-16 flex flex-col min-h-screen`}
        >
          <Navbar />
          <AppContextProvider>
            <RegisterUser />
            <main className="flex-grow">{children}</main>
          </AppContextProvider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
