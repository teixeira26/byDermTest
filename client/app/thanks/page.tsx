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
        <div className="absolute w-[100vw] h-[100vh] flex justify-center flex-col items-center top-0 left-0">
            <p className="px-8 subtitle text-center">
                <span className="text-tango-500">
                ¡Felicidades!
                    </span>&nbsp; 
 Has enviado la receta con éxito. ¿Tienes alguna pregunta o consulta técnica? No dudes en enviarnos un mensaje a nuestro
            </p>
            <a href={`https://wa.me/+5491126311142/?text=Hola`} className="px-2 mt-2 rounded-[16px] py-[12px] bg-green-500 text-white">
            WhatsApp
            </a >
        </div>
      </div>}
    </div>
  );
}
