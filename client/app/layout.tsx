'use client'
import { Montserrat } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { square } from "ldrs";
import { useRouter, usePathname } from "next/navigation";

const montserrat = Montserrat({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();
  const pathname = usePathname()
  const [hydrated, setHydrated] = useState(false);



  useEffect(() => {
    if(typeof window !== "undefined"){
      square.register();
      
      const doctor = JSON.parse(localStorage.getItem("changed") || "false");

      if (!doctor && pathname !== '/') {
        router.push('/')
      }
      else if(doctor){
        setHydrated(true);
      }
      else if(!doctor && pathname === '/'){
        setHydrated(true)
      }
    }
  }
, [pathname]);

  return (
    <html lang="en">
      <body className={`${montserrat.className} flex items-center flex-col p-8 md:px-8 md:py-0`}>
        {hydrated ?
        children
        : (
          <div className="w-[calc(100vw-64px)] h-[calc(100vh-64px)] flex justify-center items-center">
          <l-square size="64" stroke="3" speed="1" color="#686c72"></l-square>
        </div>
        )}
          
      </body>
    </html>
  );
}
