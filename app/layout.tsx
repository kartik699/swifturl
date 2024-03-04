import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SwiftURL - URL Shortener",
    description:
        "Your express ticket to concise and shareable links. Effortlessly trim lengthy URLs into sleek, bite-sized snippets for quick and easy sharing across the digital landscape.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} overflow-y-hidden`}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
