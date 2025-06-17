import type { Metadata } from "next";
import { Geist, Geist_Mono, Quantico } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/components/react-query-provider";
import NextAuthProvider from "@/components/next-auth-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const quantico = Quantico({
  variable: "--font-quantico",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "An app to help you create new habits",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`dark ${geistSans.variable} ${geistMono.variable} ${quantico.variable} antialiased`}
      >
        <NextAuthProvider session={session}>
          <ReactQueryProvider>{children}</ReactQueryProvider>

          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
