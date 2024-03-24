"use client";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import getDoctorByLicense from "./services/getDoctorBylicense";
import Swal from "sweetalert2";
import { square } from "ldrs";
import signUp from "./coupon/services/signUp";

export default function Home() {
  const router = useRouter();
  const [isUnmounting, setIsUnmounting] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [tuitionNumber, setTuitionNumber] = useState(0);
  const [error, setError] = useState(false);
  const [checkUser, setCheckUser] = useState(false);
  const [signUpLogin, setSignUpLogin] = useState(false);
  const [signUpError, setSignUpError] = useState(false);


  const [doctorName, setDoctorName] = useState('');
  const [doctorLastName, setDoctorLastName] = useState('');
  const [doctorLicense, setDoctorLicense] = useState('');

  useEffect(() => {
    if (typeof window !== "undefined") {
      square.register();
      const changed = JSON.parse(localStorage.getItem("changed") || "false");
      if (changed) {
        router.push("/welcome");
      } else {
        setHydrated(true);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (checkUser) {
        if (!tuitionNumber) {
          setError(true);
          setCheckUser(false);
          return;
        }
        try {
          const doctor = await getDoctorByLicense(tuitionNumber.toString());
          if (!doctor) {
            Swal.fire({
              position: "bottom-start",
              icon: "error",
              title: "Número de Matrícula no encontrado",
              showConfirmButton: false,
              timer: 1500,
            });
            setCheckUser(false);
            return;
          }
          setIsUnmounting(true);
          localStorage.setItem("changed", JSON.stringify(doctor));
          router.push("/products");
        } catch (error) {
          console.error("Error al obtener el doctor:", error);
          setCheckUser(false);
        }
        setCheckUser(false);
      }
    };

    fetchData();
  }, [checkUser]); // Dependencia del useEffect

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setCheckUser(true);
  };
  return (
    <>
      {signUpLogin && (
        <div
          className="fixed left-0 top-0 fadein flex justify-center p-4 items-center bg-[#00000030] z-[50] w-[100vw] h-[100vh]"
    
        >
          <div className="z-[100] px-8 py-4 bg-white rounded-[16px] flex-col text-left gap-4 p-4 md:py-4 md:py-8 flex justify-left items-left">
            
            <div className="flex justify-between md:items-center">
            
            <p className="block subtitle">Crear una nueva cuenta</p>
            <div onClick={()=>setSignUpLogin(!signUpLogin)} className='ml-8 cursor-pointer flex justify-end text-red-400 font-bold'>
            <p className="">X</p>
            </div>
            </div>
           
            <div className="flex gap-4 flex-col  text-white">
              <label htmlFor="matricula" className="text-gray-500 text-[12px]">
                {" "}
                Nombre
              </label>
              <input
                type="text"
                className={`border-solid border-[1px] px-4 py-2 text-black ${(signUpError && !/^[a-zA-Z]+$/.test(doctorName))? 'border-red-500' : 'border-black'}`}
                name="matricula"
                placeholder="Fernando"
                onChange={(e)=>setDoctorName(e.target.value)}
              />
               {(signUpError && !/^[a-zA-Z]+$/.test(doctorName)) &&
              <p className="text-red-500 mt-[-8px]">
              Debés ingresar un nombre válido
            </p>
              }
              <label htmlFor="matricula" className="text-gray-500 text-[12px]">
                {" "}
                Apellido
              </label>
              <input
                type="text"
                className={`border-solid border-[1px] px-4 py-2 text-black ${(signUpError && !/^[a-zA-Z]+$/.test(doctorLastName))? 'border-red-500' : 'border-black'}`}
                name="matricula"
                placeholder="Perez"
                onChange={(e)=>setDoctorLastName(e.target.value)}

              />
              {(signUpError && !/^[a-zA-Z]+$/.test(doctorLastName)) &&
              <p className="text-red-500 mt-[-8px]">
              Debés ingresar un apellido válido
            </p>
              }
              <label htmlFor="matricula" className="text-gray-500 text-[12px]">
                {" "}
                Nº de Matricula
              </label>
              <input
                type="number"
                className={`border-solid border-[1px] px-4 py-2 text-black ${(signUpError && !/^\d{3,}$/.test(doctorLicense)) ? 'border-red-500' : 'border-black'} `}
                name="matricula"
                placeholder="123213"
                onChange={(e)=>{
                  setDoctorLicense(e.target.value)
                }}
              />
               {(signUpError && !/^\d{3,}$/.test(doctorLicense)) &&
              <p className="text-red-500 mt-[-8px]">
              Debés ingresar un número de matricula válido
            </p>
              }
              <button
                className={`py-[4px] px-2 rounded-[16px] ${signUpError ? 'bg-nevada-500 ' : 'bg-tango-500'}`}
                onClick={async () => {
                  try {
                    if((/^[a-zA-Z]+$/.test(doctorName) && doctorName.length > 0) && (/^[a-zA-Z]+$/.test(doctorLastName) && doctorLastName.length > 0) && (/^\d{3,}$/.test(doctorLicense) && doctorLicense.length > 0)){
                      await signUp(doctorName, doctorLastName, doctorLicense)
                    Swal.fire({
                      position: "bottom-start",
                      icon: "success",
                      title: "Cuenta creada con exito",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                 setSignUpLogin(!signUpLogin)}
                 else{
                  setSignUpError(true)
                 }
                  } catch (error) {
                    Swal.fire({
                      position: "bottom-start",
                      icon: "error",
                      title: "Hubo un error",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                }}
              >
                Crear cuenta
              </button>
            </div>
          </div>
        </div>
      )}
      {hydrated ? (
        <div>
          <main className="flex flex-col items-center fadein md:hidden">
            <p className="block text-black title-biggest text-center">
              Bienvenido a nuestro sistema de
              <span className="text-tango-500">&nbsp; descuentos</span>
            </p>
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <fieldset className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <label
                    className="subtitle-biggest mt-8 font-medium"
                    htmlFor="tuitionNumber"
                  >
                    Ingresá tu número de Matrícula
                  </label>
                  <div className="flex flex-col justify-center items-end">
                    <input
                      type="number"
                      placeholder="1299232"
                      id="tuitionNumber"
                      className={`border-2 p-4 rounded-full ${
                        error ? "border-red-500" : "border-black"
                      } block w-full`}
                      onChange={(e) => {
                        setTuitionNumber(
                          e.target.value as unknown as SetStateAction<number>
                        );
                        if (typeof parseInt(e.target.value, 10) === "number")
                          setError(false);
                      }}
                    />
                  </div>
                  {error ? (
                    <p className="text-red-500">
                      Debés ingresar un número de matrícula
                    </p>
                  ) : (
                    <></>
                  )}
                </div>

                <p>
                  {" "}
                  ¿Es tu primera vez en la aplicación?{" "}
                  <span
                    onClick={() => setSignUpLogin(true)}
                    className="text-tango-500 hover:underline cursor-pointer"
                  >
                    Crea tu cuenta.
                  </span>
                </p>

                <div className="w-full flex justify-center">
                  <button
                    onClick={(e) => {
                      handleFormSubmit(e);
                    }}
                    className="title bg-tango-500 hover:bg-tango-600 active:bg-tango-700 rounded-full inline w-fit px-8 py-2 text-white"
                  >
                    Ingresar
                  </button>
                </div>
              </fieldset>
            </form>
            <div className="relative w-full mt-8 aspect-w-16 aspect-h-9">
              <img alt="scientist" src={"/scientist.png"}></img>
            </div>
          </main>

          <div className="hidden md:flex absolute bg-nevada-500 w-[50vw] h-[100vh] left-0 top-0"></div>
          <div className="hidden md:flex absolute bg-white w-[50vw] z-10 h-[100vh] right-0 top-0"></div>

          <div className="hidden md:flex min-h-[calc(100vh)] absolute overflow-hidden left-0 items-end transform translate-x-[-92px]">
            <div className="relative mt-8 w-[800px] transform -scale-x-100 md:translate-x-[-64px] lg:translate-x-[0]">
              <img alt="scientist" src="/scientist.png"></img>
            </div>
          </div>

          <div className="hidden md:flex absolute right-0 top-0 w-[50vw] h-[100vh] justify-center items-center z-10">
            <main className="flex-col items-center fadein hidden md:flex m-8">
              <p className="block text-black title-biggest text-center">
                Bienvenido a nuestro sistema de
                <span className="text-tango-500">&nbsp; descuentos</span>
              </p>
              <form onSubmit={(e) => handleFormSubmit(e)}>
                <fieldset className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    <label
                      className="subtitle-biggest mt-8 font-medium"
                      htmlFor="tuitionNumber"
                    >
                      Ingresá tu número de Matrícula
                    </label>
                    <div className="flex flex-col justify-center items-end">
                      <input
                        type="number"
                        id="tuitionNumber"
                        placeholder="11212321"
                        onChange={(e) => {
                          setTuitionNumber(
                            e.target.value as unknown as SetStateAction<number>
                          );
                          if (typeof parseInt(e.target.value, 10) === "number")
                            setError(false);
                        }}
                        className={`border-2 p-4 rounded-full  ${
                          error ? "border-red-500" : "border-black"
                        } block w-full`}
                      />
                    </div>
                    
                    {error ? (
                      <p className="text-red-500">
                        Debés ingresar un número de matrícula
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <p>
                  {" "}
                  ¿Es tu primera vez en la aplicación?{" "}
                  <span
                    onClick={() => setSignUpLogin(true)}
                    className="text-tango-500 hover:underline cursor-pointer"
                  >
                    Crea tu cuenta.
                  </span>
                </p>
                  <div className="w-full flex justify-center">
                    <button
                      onClick={(e) => {
                        handleFormSubmit(e);
                      }}
                      className={`title ${
                        error
                          ? "bg-nevada-300"
                          : "bg-tango-500 hover:bg-tango-600 active:bg-tango-700"
                      } rounded-full inline w-fit px-8 py-2 text-white`}
                    >
                      Ingresar
                    </button>
                  </div>
                </fieldset>
              </form>
            </main>
          </div>
        </div>
      ) : (
        <div className="w-[calc(100vw-64px)] h-[calc(100vh-64px)] flex justify-center items-center">
          <l-square size="64" stroke="3" speed="1" color="#686c72"></l-square>
        </div>
      )}
    </>
  );
}
