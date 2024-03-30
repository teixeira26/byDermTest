'use client'
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../public/confetti.json";

type Props = {};

export default function page({}: Props) {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
 
        setHydrated(true);
      }, []);
    

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="absolute z-100">
      {hydrated && <div>
       
        <Lottie options={defaultOptions} height={"100vh"} width={"100vw"} />
        <div className="fixed w-[100dvw] h-[100dvh] flex justify-center flex-col items-center top-0 left-0">
        <img src="logo.png" alt="" className="w-[128px] mb-4"/>
            <p className="px-8 subtitle text-center">
                 
 Enviaste tu receta con <span className="text-tango-500">
                éxito 
                    </span>&nbsp;. Si tenes dudas o consulta comunicate con el laboratorio.
            </p>
            <a href={`/products`} className="px-2 mt-4 rounded-[16px] py-[12px] bg-tango-500 text-white">
            Seguir recetando
            </a >

            
        </div>
      </div>}
      <a href={`https://wa.me/+5491126311142/?text=Hola`} className="w-[64px] h-[64px] fixed right-[32px] bottom-[48px]">
              <img src="whats.png" alt="" className="w-full h-full shake"/>
            </a>
    </div>
  );
}
