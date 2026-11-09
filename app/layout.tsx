import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "Aman the Architect — Where Imagination Takes Shape",
 description: "Where Imagination Takes Shape. Architecture and interiors by Aman the Architect.",
 icons: { icon: "/favicon.svg" },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {return <html lang="en"><body>{children}</body></html>;}
