"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass, FaCartShopping, FaPlus } from "react-icons/fa6";
import products, { product } from "./models/products.json";
import ContentLoader from "react-content-loader";
import { useRouter } from "next/navigation";


export default function Page() {
  const [productsOnCart, setProductsOnCart] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [productsFiltered, setProductsFiltered] = useState<product[]>(products);
  const [modalState, setModalState] = useState<boolean>(false);
  const router = useRouter()

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setProductsOnCart(cartItems.length);
    setHydrated(true);
  }, []);

  const modalToggle = () => {
    setModalState(!modalState);
    const body = document.getElementsByTagName("body")[0];
    if (modalState) body.className = body.className.split(' overflow-visible').join('').split(' overflow-visible').join('') + " overflow-visible";
    else body.className = body.className.split(' overflow-hidden').join('').split(' overflow-visible').join('') + " overflow-hidden";
  };

  const addProductToCart = (item: product) => {
    const previousLocalStorageContent = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    localStorage.setItem(
      "cart",
      JSON.stringify([...previousLocalStorageContent, item])
    );
    setProductsOnCart(productsOnCart + 1);
    modalToggle();
  };

  const filterCards = (value: string): product[] => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    const filteredProducts = filterCards(value);
    setProductsFiltered(filteredProducts);
  };

  return (
    <div className="fadein">
      {modalState && (
        <div
          className="fixed left-0 top-0 fadein flex justify-center p-4 items-center bg-[#00000030] z-[50] w-[100vw] h-[100vh]"
          onClick={() => modalToggle()}
        >
          <div className="z-[100] bg-white rounded-[16px] flex-col text-center gap-4 p-4 md:p-16 flex justify-center items-center">
            <p className="block subtitle">El ítem ha sido agregado exitosamente.</p>
            <div className="flex gap-4 flex-col md:flex-row text-white">
              <button className="py-[4px] px-2 bg-tango-500 rounded-[16px]"
              onClick={()=>router.push("/coupon")}
              >
              Emitir receta
              </button>
              <button className="py-[4px] px-2 bg-nevada-500 rounded-[16px]" onClick={()=>modalToggle()}>
              Seguir Navegando
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="flex items-center justify-between fixed z-40 w-[100vw] bg-white top-0 left-0 pt-8 pb-8">
        <Image
          className="mr-4 ml-8"
          alt="logo byDerm"
          width={52}
          height={52}
          src={"/logo.png"}
        />
        <div className="flex flex-col justify-center items-end mr-4 w-full relative">
          <input
            type="text"
            id="tuitionNumber"
            placeholder="Cleanser..."
            className="border-2 p-4 rounded-full border-black block w-full"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
          <button className="absolute p-[14px] bg-nevada-500 hover:bg-nevada-600 active:bg-nevada-700 rounded-full right-1">
            <FaMagnifyingGlass color="white" size={"24px"} />
          </button>
        </div>
        <div>
          <Link href="/coupon">
            <FaCartShopping
              className="text-tango-500 hover:text-tango-600 active:text-tango-700 mr-8"
              size={48}
            />
          </Link>
          {productsOnCart > 0 && (
            <div className="absolute bg-white right-[26px] z-50 top-[38px] w-4 h-4 border-2 border-tango-500 rounded-[50%] flex justify-center items-center">
              <p className="text-tango-500 text-[12px] font-bold ">
                {productsOnCart}
              </p>
            </div>
          )}
        </div>
      </nav>
      <div className="md:grid grid-cols-2 gap-x-8 min-w-[calc(100vw-64px)] w-full">
        {hydrated ? (
          productsFiltered.map((product) => (
            <article key={product.imagePath} className="mt-[94px] w-full">
              <div className="w-full mt-8 h-[40vh] md:h-[60vh] relative">
                <img
                  className="rounded-[16px] object-cover w-full h-[40vh] md:h-[60vh] cursor-pointer"
                  alt={product.name}
                  src={`/${product.imagePath}`}
                  onClick={() => addProductToCart(product)}
                />
              </div>
              <p className="title font-bold mt-4">
                {product.name}
                <span className="ml-2 text-small">{`${product.quantity} ml`}</span>
              </p>
              <p
                title={product.vehicle}
                className="subtitle mt-4 w-[calc(100%-32px)]"
              >
                {product.vehicle}
              </p>
              <p
                title={product.activeIngredient}
                className="text-small mt-4 w-[calc(100%-32px)]"
              >
                {product.activeIngredient}
              </p>
              <p className="text-small mt-4">
                <span className="font-bold mr-2">
                  {(
                    parseFloat(product.price.split(",").join("")) -
                    parseFloat(product.price.split(",").join("")) *
                      (parseInt(product.discount, 10) / 100)
                  )
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </span>
                <span className="line-through">{product.price}</span>
              </p>
              <p className="text-small mt-2 text-tango-500 font-bold">
                <span>
                  <Image
                    width={16}
                    height={16}
                    src="/discount.png"
                    alt="descuento"
                    className="mr-2 inline"
                  />
                </span>
                -25%
              </p>
              <div className="flex items-end justify-between">
                <p className="text-small mt-4 bg-nevada-500 text-white px-[12px] w-fit py-[4px] rounded-[16px]">
                  {product.function}
                </p>
                <FaPlus
                  size={32}
                  className="text-tango-500 hover:text-tango-600 active:text-tango-700 cursor-pointer"
                  onClick={() => addProductToCart(product)}
                />
              </div>
            </article>
            // <article key={product.imagePath} className="mt-[130px] w-full flex flex-col">

            //   <img
            //     className="w-full rounded-[16px] object-cover"
            //     src={product.imagePath}
            //     alt={product.name}
            //   />

            //   <div className="w-full mt-4">
            //     <p className="title font-bold">{product.name}</p>
            //     <p className="subtitle mt-4">{product.name}</p>
            //     <p className="text-small mt-4">{product.activeIngredient}</p>
            //     <p className="text-small mt-4">
            //       <span className="font-bold mr-2">9.900,00</span>
            //       <span className="line-through">9.900,00</span>
            //     </p>
            //     <p className="text-small mt-2 text-tango-500 font-bold">
            //       <span>
            //         <Image
            //           width={16}
            //           height={16}
            //           src="/discount.png"
            //           alt="descuento"
            //           className="mr-2 inline"
            //         />
            //       </span>
            //       -25%
            //     </p>
            //     <p className="text-small mt-4 bg-nevada-500 text-white px-[12px] w-fit py-[4px] rounded-[16px]">Descongestivo</p>
            //   </div>

            // </article>
          ))
        ) : (
          <div className="z-50 flex justify-center">
            <div>
              <ContentLoader
                speed={2}
                width={400}
                height={1060}
                viewBox="0 400 400 1060"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="8" y="500" rx="16" ry="16" width="380" height="400" />
                <rect x="8" y="928" rx="2" ry="2" width="300" height="40" />
                <rect x="8" y="988" rx="2" ry="2" width="250" height="18" />
              </ContentLoader>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
