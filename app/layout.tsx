import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";
import Navbar from "./components/navbar/Navbar";
import InputAppointments from "./components/InputAppointments";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "STADVDB",
  description: "i need sleep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        
        <Navbar />
        <InputAppointments />
        {children}

        </body>

    </html>
  );
}
