"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass, FaCartShopping, FaPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import products from "./models/products.json";
import ContentLoader from "react-content-loader";

interface Product {
  name: string;
  description: string;
  imagePath: string;
}

export default function Page() {
  const [productsOnCart, setProductsOnCart] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [productsFiltered, setProductsFiltered] = useState<Product[]>(products);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setProductsOnCart(cartItems.length);
    setHydrated(true);
  }, []);

  const addProductToCart = (item: Product) => {
    const previousLocalStorageContent = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...previousLocalStorageContent, item]));
    setProductsOnCart(productsOnCart + 1);
    Swal.fire({
      position: "bottom-start",
      icon: "success",
      title: "Producto agregado con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const filterCards = (value: string): Product[] => {
    return products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()));
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    const filteredProducts = filterCards(value);
    setProductsFiltered(filteredProducts);
  };

  return (
    <div className="fadein">
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
              <p className="text-tango-500 text-[12px] font-bold ">{productsOnCart}</p>
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
            <p className="title font-bold mt-4">{product.name}</p>
            <div className="flex items-end">
              <p title={product.description} className="subtitle mt-4 w-[calc(100%-32px)]">
                {product.description}
              </p>
              <FaPlus
                size={32}
                className="text-tango-500 hover:text-tango-600 active:text-tango-700 cursor-pointer"
                onClick={() => addProductToCart(product)}
              />
            </div>
          </article>
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