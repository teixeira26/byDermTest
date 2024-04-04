"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { square } from "ldrs";


export default function Home() {
  const router = useRouter();
  const [isUnmounting, setIsUnmounting] = useState(false);

  // const changed = JSON.parse(localStorage.getItem("changed") || "false");



  const [hydrated, setHydrated] = useState(false);
  const [doctorData, setDoctorData] = useState({name: ''});



  useEffect(() => {
    if(typeof window !== "undefined"){
      square.register();

      const doctor = JSON.parse(localStorage.getItem("changed") || "false");
      const previousDate = localStorage.getItem("previousDate");
      const actualDate = new Date().toISOString().split("T")[0];
      const changed = JSON.parse(localStorage.getItem("dateChanged") || "false");
  
  
      setDoctorData(doctor);
  
      if (previousDate === actualDate && !changed) {
        router.push('/products')
      }
      else if (changed) {
        localStorage.setItem("dateChanged", "false");
      } 
      else{
      localStorage.setItem("previousDate", new Date().toISOString().split("T")[0]);
      localStorage.setItem("date", new Date().toISOString().split("T")[0]);
      localStorage.setItem("dateChanged", "true");
      setHydrated(true);
    }
  }

  }, []);

  return (
    <div>
      {hydrated ? <>
      <main
        className={`flex flex-col justify-center min-h-[100vh] items-center overflow-hidden md:hidden ${"fadein"}`}
      >
        <Image
          className="mb-8"
          alt="logo byDerm"
          width={124}
          height={64}
          src={"/logo.png"}
        />
        <p className="block text-black title-biggest text-center">
          Hola {hydrated ? doctorData.name : ''},
          <span className="text-tango-500">&nbsp; gracias&nbsp;</span>
          por apoyarnos
        </p>

        <div className="w-full flex justify-center mt-8">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsUnmounting(true);
              router.push("/products");
            }}
            className="title bg-tango-500 hover:bg-tango-600 active:bg-tango-700 rounded-full inline w-fit px-8 py-2 text-white"
          >
            Ingresar a la app
          </button>
        </div>
       
      </main>


      <img style={{position: 'absolute', width: '50vw', height: '100vh', left:'0', objectFit: 'cover'}} className="hidden md:flex" src="portada.jpg" alt=" " />
      <div className="hidden md:flex w-[50vw] absolute h-[100vh] bg-white right-0 z-10 transform translate-x-[-32px]"></div>

      <main className="hidden md:flex bg-nevada-300 min-h-[calc(100vh-64px)]">

  
        <div className="w-[50vw] bg-nevada-500"></div>
        <div className="bg-white min-h-[calc(100vh-64px)] flex items-center z-10 w-[50vw]">
          <div
            className={`flex flex-col items-center overflow-hidden ${"fadein"}`}
          >
            <Image
              className="mb-8"
              alt="logo byDerm"
              width={124}
              height={64}
              src={"/logo.png"}
            />
            <p className="block text-black title-biggest text-center">
              Hola {hydrated ? doctorData.name : ''},
              <span className="text-tango-500">&nbsp; gracias&nbsp;</span>
              por apoyarnos
            </p>

            <div className="w-full flex justify-center mt-8">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsUnmounting(true);
                  router.push("/products");
                }}
                className="title bg-tango-500 hover:bg-tango-600 active:bg-tango-700 rounded-full inline w-fit px-8 py-2 text-white"
              >
                Ingresar a la app
              </button>
            </div>
          </div>
        </div>
      </main></>
: (
  <div className="w-[calc(100vw-64px)] h-[calc(100vh-64px)] flex justify-center items-center">
  <l-square size="64" stroke="3" speed="1" color="#686c72"></l-square>
</div>
)}
    </div>
  );
}
