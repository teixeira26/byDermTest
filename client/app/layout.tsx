import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "By Derm Cupones",
  description: "Una app para que generes cupones de decuento a tus pacientes 😎",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} flex items-center flex-col p-8 md:px-8 md:py-0`}>
          {children}
      </body>
    </html>
  );
}
