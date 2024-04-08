"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegPaperPlane, FaArrowRight } from "react-icons/fa6";
import Swal from "sweetalert2";
import countUniqueOccurrences from "./services/countUniqueOcurrences";
import sendEmail from "./services/sendEmail";
import createRecipe from "./services/createRecipe";
import sendWhatsapp from "./services/sendWhats";
import updateDoctors from "./services/updateDoctors";

function getCartItems() {
  return JSON.parse(localStorage.getItem("cart") || "[]") as never[];
}

function clearCart() {
  localStorage.setItem("cart", JSON.stringify([]));
}

function validarEmail(email: string) {
  // Expresión regular para validar direcciones de correo electrónico
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarWhats(number: string) {
  // Expresión regular para validar direcciones de correo electrónico
  const regex = /^\d{10}$/;
  return regex.test(number);
}

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, sendMessage] = useState(false);
  const [whatsApp, sendWhatsApp] = useState(false);
  const router = useRouter();

  // Cargar los elementos del carrito al montar el componente
  useEffect(() => {
    setCartItems(countUniqueOccurrences(getCartItems()) as any);
  }, []);

  useEffect(() => {
    if (message) {
      if (validarEmail(email)) {
        if(cartItems.length === 0){
          Swal.fire({
            icon: "info",
            title: "Oops...",
            text: "Debés ingresar productos a la receta antes de enviarla!",
          });
          sendMessage(false);
        }
        else {
          const doctor = JSON.parse(localStorage.getItem("changed") || "false");
          const products = cartItems.map((x: any)=>{
            return {
              id: x.id,
              quantity: x.quantity
            }
          })
          sendEmail(email, doctor.name, doctor.license, products);
        createRecipe(
          JSON.parse(localStorage.getItem("changed") as any),
          cartItems.map((x: any) => {
            return {
              name: x.name,
              count: x.count as any,
              price: x.price,
              id: x.id,
            };
          }) as any
        );
        updateDoctors(doctor.name, doctor.lastName, doctor.license, cartItems.map((x: any) => {
          return {
            name: x.name,
            quantity: x.quantity as any,
          };
        }) as any, doctor.id)
        clearCart();
        router.push("/thanks");
        sendMessage(false);}
      } else
        Swal.fire({
          icon: "info",
          title: "Oops...",
          text: "La dirección de email que ingresaste no es válida!",
        });
        sendMessage(false);
    }
  }, [message]);

  useEffect(() => {
    if (whatsApp) {
      if (validarWhats(whatsAppNumber)) {
        if(cartItems.length === 0){
          Swal.fire({
            icon: "info",
            title: "Oops...",
            text: "Debés ingresar productos a la receta antes de enviarla!",
          });
          sendWhatsApp(false);
        }
        else {
        const doctor = JSON.parse(localStorage.getItem("changed") || "false");
        const products = cartItems.map((x: any)=>{
          return {
            id: x.id,
            quantity: x.quantity
          }
        })
        sendWhatsapp(whatsAppNumber, doctor.name, doctor.license, products);
      createRecipe(
        JSON.parse(localStorage.getItem("changed") as any),
        cartItems.map((x: any) => {
          return {
            name: x.name,
            count: x.count as any,
            price: x.price,
            id: x.id,
          };
        }) as any
        );
        updateDoctors(doctor.name, doctor.lastName, doctor.license, cartItems.map((x: any) => {
          return {
            name: x.name,
            quantity: x.quantity as any,
          };
        }) as any, doctor.id)
        clearCart();
        router.push("/thanks");
        sendWhatsApp(false);}
      } else
        Swal.fire({
          icon: "info",
          title: "Oops...",
          text: "El número de WhatsApp ingresado no es válido. Debes ingresar un número con el siguiente formato: 1122223333.",
        });
        sendWhatsApp(false);
    }
  }, [whatsApp]);

  return (
    <>
    <button
              onClick={async () => {
                if(email.length > 0 )sendMessage(true);
                if(whatsAppNumber.length > 0 )sendWhatsApp(true)
                else if(email.length > 0  && whatsAppNumber.length > 0 ){
                  Swal.fire({
                    icon: "info",
                    title: "Oops...",
                    text: "Debes ingresar un número de WhatsApp o un Mail antes de enviar una receta!",
                  });
              }
              }}
              className="fixed font-bold bottom-[32px] right-[32px] px-6 py-4 z-[100] text-white bg-nevada-500 rounded-[50%] flex flex-col  border-solid border-[2px] border-white justify-center items-center"
            >
              <FaRegPaperPlane color="white" size={"32px"} />
              Enviar
            </button>
      <main className="flex flex-col items-center overflow-hidden fadein md:hidden">
        <Link href={"/products"}>
          <FaArrowRight
            size={32}
            className="rotate-180 absolute left-[32px] text-nevada-500 hover:text-nevada-600 active:text-nevada-700"
          />
        </Link>
        <Image
          className="mb-8"
          alt="logo byDerm"
          width={124}
          height={64}
          src={"/logo.png"}
        />
        <p className="block text-black title-biggest text-center">
          GENERAR RECETA
        </p>
        <div className="bg-tango-500 mt-8 py-4 w-full font-bold">
          <p className="text-white text-center subtitle-biggest">
            <span
              style={{ fontSize: "48px" }}
              className="block subtitle-biggest font-bold title-biggest"
            >
              25%
            </span>
            DE DESCUENTO
          </p>
        </div>
        <div className="w-full flex flex-col items-left mt-8">
          {cartItems.length ? (
            cartItems.map(({ count, name, quantity }) => (
              <p key={name} className="subtitle mt-4">
                <span className="font-bold">{count}un. &nbsp;</span> {name}
                &nbsp; <span className="text-small">{quantity}</span>
              </p>
            ))
          ) : (
            <p className="subtitle mt-4">No agregaste productos al carrito</p>
          )}
          <hr className="mt-4" />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <label className="text-[24px] mt-8 font-medium w-full" htmlFor="name">
            Nombre y Apellido
          </label>
          <div className="flex flex-col justify-center items-end">
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Juan Perez"
              className="border-2 p-4 rounded-full border-black block w-full"
            />
          </div>
        </div>
         <div className="flex flex-col gap-4 w-full">
        <label className="text-[24px] mt-8 font-medium w-full" htmlFor="name">
          WhatsApp
        </label>
        <div className="flex flex-col justify-center items-end">
          <input
            type="text"
            id="name"
            placeholder="1165693056"
            className={`border-2 p-4 rounded-full border-black block w-full ${email.length > 0 ? 'bg-nevada-100' : 'bg-white'}`}
            onChange={(e) => setWhatsAppNumber(e.target.value)}
            disabled = {email.length > 0}
          />
         
        </div>
        
      </div> 
        <div className="flex flex-col gap-4 w-full">
          <label className="text-[24px] mt-8 font-medium w-full" htmlFor="name">
            Email
          </label>
          <div className="flex flex-col justify-center items-end">
            <input
              type="text"
              id="name"
              placeholder="exemplo@gmail.com"
              className={`border-2 p-4 rounded-full border-black block w-full ${whatsAppNumber.length > 0 ? 'bg-nevada-100' : 'bg-white'}`}
              onChange={(e) => setEmail(e.target.value)}
              disabled = {whatsAppNumber.length > 0}
            />
           
          </div>
        </div>
      </main>

      <img alt="regalos" src={"/gifts.png"} className="hidden md:flex w-[49vw] fixed z-[199] left-0 bottom-[64px]"></img>
      <div className="hidden md:flex w-[50vw] absolute h-[100vh] bg-white right-0 z-10 transform  translate-y-[-32px]"></div>

      <main className="hidden md:flex bg-nevada-300  min-h-[calc(100vh-64px)] z-30 ">
        <div className="min-h-[calc(100vh-64px)] absolute overflow-hidden flex items-end transform translate-x-[-92px]">
          <div className="absolute mt-8 w-[100vw] h-[100vh] transform -scale-x-100  z-100">
          </div>
        </div>
        <div className="w-[50vw] bg-nevada-00"></div>
        <div className="bg-white min-h-[calc(100vh-64px)] flex flex-col p-8 items-center z-10 w-[50vw]">
          <Link href={"/products"}>
            <FaArrowRight
              size={32}
              className="rotate-180 absolute left-[32px] text-nevada-500 hover:text-nevada-600 active:text-nevada-700"
            />
          </Link>

          <p className="block text-black title-biggest text-center">
            Generar Receta
          </p>
          <div className="bg-tango-500 mt-8 py-4 w-full">
            <p className="text-white text-center subtitle-biggest">
              <span
                style={{ fontSize: "48px" }}
                className="block subtitle-biggest font-bold title-biggest"
              >
                25%
              </span>
              de descuento
            </p>
          </div>
          <div className="w-full flex flex-col items-left mt-8">
            {cartItems.length ? (
              cartItems.map(({ count, name, quantity }) => (
                <p key={name} className="subtitle mt-4">
                  <span className="font-bold">{count}un. &nbsp;</span> {name}
                  &nbsp; <span className="text-small">{quantity}</span>
                </p>
                               

              ))
            ) : (
              <p className="subtitle mt-4">No agregaste productos al carrito</p>
            )}
            <hr className="mt-4" />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <label
              className="text-[24px] mt-8 font-medium w-full"
              htmlFor="name"
            >
              Nombre y Apellido
            </label>
            <div className="flex flex-col justify-center items-end">
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan Perez"
                className="border-2 p-4 rounded-full border-black block w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
        <label className="text-[24px] mt-8 font-medium w-full" htmlFor="name">
          WhatsApp
        </label>
        <div className="flex flex-col justify-center items-end">
          <input
            type="text"
            id="name"
            placeholder="1165693056"
            className="border-2 p-4 rounded-full border-black block w-full "
            onChange={(e) => setWhatsAppNumber(e.target.value)}
            disabled = {email.length > 0}
          />
       
        </div>
      </div> 
          <div className="flex flex-col gap-4 w-full">
            <label
              className="text-[24px] mt-8 font-medium w-full"
              htmlFor="name"
            >
              Email
            </label>
            <div className="flex flex-col justify-center items-end">
              <input
                type="email"
                id="name"
                placeholder="exemplo@gmail.com"
                className={`border-2 p-4 rounded-full border-black block w-full ${whatsAppNumber.length > 0 ? 'bg-nevada-100' : 'bg-white'}`}
                onChange={(e) => setEmail(e.target.value)}
                disabled = {whatsAppNumber.length > 0}

              />
           
            </div>
          </div>
        </div>
        
      </main>
    </>
  );
}
