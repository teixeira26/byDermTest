import React, { useEffect, useState } from "react";
import Image from "next/image";
import { product } from "../models/product";

type Props = {
  product: product;
  modalState: any;
  setModalState: any;
  productsOnCart: any;
  setProductsOnCart: any;
};

function formatCurrency(value: any) {
  // Convertir el valor a un número
  const numberValue = parseFloat(value);

  // Verificar si el valor es un número válido
  if (isNaN(numberValue)) {
    return "Valor no válido";
  }

  // Formatear el número como moneda ARS
  const formattedValue = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(numberValue);

  return formattedValue;
}

export default function Card({
  product,
  modalState,
  setModalState,
  productsOnCart,
  setProductsOnCart,
}: Props) {

  const [quantitySelected, setQuantitySelected] = useState('');

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const selectedItem = cartItems.find((item:any) => {
      return item.name === product.name;
    });

    if (selectedItem) {
      setQuantitySelected(selectedItem.quantity);
    }
  }, [product]);

  const modalToggle = () => {
    setModalState(!modalState);
    const body = document.getElementsByTagName("body")[0];
    body.className = modalState ? body.className.replace(" overflow-visible", "") + " overflow-hidden" : body.className.replace(" overflow-hidden", "") + " overflow-visible";
  };

  const changeCart = (item:any, quantity:any) => {
    const previousLocalStorageContent = JSON.parse(localStorage.getItem("cart") || "[]");
    const selectedItem = previousLocalStorageContent.find((x:any) => x.name === item.name && x.quantity === quantity);
    if (selectedItem) {
      removeProductsFromCart(item, quantity);
    } else {
      addProductToCart(item, quantity);
    }
  };

  const addProductToCart = (item:any, quantity:any) => {
    const previousLocalStorageContent = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = [...previousLocalStorageContent, { ...item, quantity }];
    localStorage.setItem("cart", JSON.stringify(newCart));
    setProductsOnCart(newCart.length);
    setQuantitySelected(quantity);
    modalToggle();
  };

  const removeProductsFromCart = (item:any, quantity:any) => {
    const previousLocalStorageContent = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = previousLocalStorageContent.filter((x:any) => x.name !== item.name || x.quantity !== quantity);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setProductsOnCart(newCart.length);
    setQuantitySelected('');
  };


  return (
    <div>
       <p title={product.name}
className="text-[20px] font-bold my-4">{product.name}</p>
      <article
        key={product.imagePath}
        className="mt-4 w-full flex gap-4  h-fit"
      >
        
        <div className="flex flex-col gap-4  h-fit">
          {product &&
            product.quantity &&
            product.quantity.map((x: any) => {
              return (
                <div className="flex w-[60px] truncate max-w-[60px] overflow-hidden justify-center flex-col items-center gap-2 accent-tango-600">
                  <input
                    onClick={() => changeCart(product, x)}
                    type="checkbox"
                    checked={quantitySelected == product.quantity[0]}
                    className="w-6 h-6 rounded-[50%]"
                  />
                  <label className="w-[60px] elipse text-center" htmlFor="radio ">{x}</label>
                </div>
              );
            })}
        </div>

        <div className="relative  h-fit ">
          <img
            className="rounded-[16px] object-cover h-[11vh]  w-[11vh] md:h-[20vh] md:w-[20vh] cursor-pointer"
            alt={product.name}
            src={`/${product.imageUrl}`}
          />
        </div>

        <div className="max-w-[150px] sm:max-w-[150px] md:max-w-96">
         
          <p
            title={product.vehicle}
            className="text-[16px] w-[calc(100%-32px)]"
          >
            {product.vehicle}
          </p>
          <p
            title={product.activeIngredient}
            className="text-small mt-2 w-[calc(100%-32px)] text-[#888888]"
          >
            {product.activeIngredient}
          </p>
        </div>
      </article>
      <div >
        <div className="my-2">
          <p className="text-small">
            <span className="line-through mr-2">
              {product.price &&
                formatCurrency(product.price[0].amount.toFixed(2))}
            </span>

            <span className="font-bold mr-2">
              {product.price &&
              product.price.find((x) => x.quantity === quantitySelected)
                ? formatCurrency(
                    (product.price
                      .find((x) => x.quantity === quantitySelected)
                      ?.amount.toFixed(2) as unknown as number) -
                      ((product.price[0].amount.toFixed(
                        2
                      ) as unknown as number) *
                        product.discount) /
                        100
                  )
                : product.price && product.price[0]
                ? formatCurrency(
                    (product.price[0].amount.toFixed(2) as unknown as number) -
                      ((product.price[0].amount.toFixed(
                        2
                      ) as unknown as number) *
                        product.discount) /
                        100
                  )
                : "???"}
            </span>
          </p>

          <div className="flex justify-between mt-2 mb-4 items-center">
            <p className="text-[12px] text-white bg-tango-500 rounded-[50%] max-h-[50px] max-w-[50px] p-3 text-center font-bold ">
              25%
              <span className="block text-[10px] mt-[-4px]">
                off
              </span>
            </p>

            <p title={product.productFunction} className="text-small bg-nevada-500 inline max-w-[180px] text-white px-[12px] text-center w-fit py-[4px] rounded-[16px] h-fit">
              {product.productFunction}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full border border-solid border-gray-400"></div>
    </div>
  );
}
