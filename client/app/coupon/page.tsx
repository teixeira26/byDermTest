"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegPaperPlane, FaArrowRight } from "react-icons/fa6";
import Swal from "sweetalert2";
import countUniqueOccurrences from "./services/countUniqueOcurrences";

function getCartItems() {
  return JSON.parse(localStorage.getItem("cart") || "[]") as never[];
}

function clearCart() {
  localStorage.setItem("cart", JSON.stringify([]));
}

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  // Cargar los elementos del carrito al montar el componente
  useEffect(() => {
    setCartItems(countUniqueOccurrences(getCartItems()) as any);
  }, []);

  return (
    <>
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
        width={64}
        height={64}
        src={"/logo.png"}
      />
      <p className="block text-black title-biggest text-center">
        Generar Receta
      </p>
      <div className="bg-tango-500 mt-8 py-4 w-full">
        <p className="text-white text-center subtitle-biggest">
          <span style={{ fontSize: "48px" }} className="block subtitle-biggest font-bold title-biggest">25%</span>
          de descuento
        </p>
      </div>
      <div className="w-full flex flex-col items-left mt-8">
        {cartItems.length ? (
          cartItems.map(({ count, name }) => (
            <p key={name} className="subtitle mt-4">
              <span className="font-bold">{count}un. &nbsp;</span> {name}
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
            className="border-2 p-4 rounded-full border-black block w-full"
            onChange={(e) => setNumber(e.target.value)}

          />
          <a
            onClick={clearCart}
            href={`https://wa.me/+549${number}/?text=Hola ${name},te comparto la receta con un descuento del 25%`}
            className="absolute p-[14px] bg-tango-500 hover:bg-tango-600 active:bg-tango-700 rounded-full mr-1"
          >
            <FaRegPaperPlane color="white" size={"24px"} />
          </a>
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
            className="border-2 p-4 rounded-full border-black block w-full"
          />
          <button
            onClick={() => {
              Swal.fire({
                position: "bottom-start",
                icon: "success",
                title: "Mensaje enviado",
                showConfirmButton: false,
                timer: 1500,
              });
            }}
            className="absolute p-[14px] bg-tango-500 hover:bg-tango-600 active:bg-tango-700 rounded-full mr-1"
          >
            <FaRegPaperPlane color="white" size={"24px"} />
          </button>
        </div>
      </div>
    </main>

    <div className="hidden md:flex w-[50vw] absolute h-[100vh] left-0 bg-nevada-300 transform translate-y-[-32px]"></div>
      <div className="hidden md:flex w-[50vw] absolute h-[100vh] bg-white right-0 z-10 transform  translate-y-[-32px]"></div>

      <main className="hidden md:flex bg-nevada-300  min-h-[calc(100vh-64px)] z-30 ">
      <div className="min-h-[calc(100vh-64px)] absolute overflow-hidden flex items-end transform translate-x-[-92px]">
        <div className="relative mt-8 w-[800px] transform -scale-x-100">
              <img alt="regalos" src={"/gifts.png"} className="w-full"></img>
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
          <span style={{ fontSize: "48px" }} className="block subtitle-biggest font-bold title-biggest">25%</span>
          de descuento
        </p>
      </div>
      <div className="w-full flex flex-col items-left mt-8">
        {cartItems.length ? (
          cartItems.map(({ count, name }) => (
            <p key={name} className="subtitle mt-4">
              <span className="font-bold">{count}un. &nbsp;</span> {name}
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
            className="border-2 p-4 rounded-full border-black block w-full"
            onChange={(e) => setNumber(e.target.value)}

          />
          <a
            onClick={clearCart}
            href={`https://wa.me/+549${number}/?text=Hola ${name},te comparto la receta con un descuento del 25%`}
            className="absolute p-[14px] bg-tango-500 hover:bg-tango-600 active:bg-tango-700 rounded-full mr-1"
          >
            <FaRegPaperPlane color="white" size={"24px"} />
          </a>
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
            className="border-2 p-4 rounded-full border-black block w-full"
          />
          <button
            onClick={() => {
              Swal.fire({
                position: "bottom-start",
                icon: "success",
                title: "Mensaje enviado",
                showConfirmButton: false,
                timer: 1500,
              });
            }}
            className="absolute p-[14px] bg-tango-500 hover:bg-tango-600 active:bg-tango-700 rounded-full mr-1"
          >
            <FaRegPaperPlane color="white" size={"24px"} />
          </button>
        </div>
        </div>
      </div>
      </main>
    </>
    
  );
}