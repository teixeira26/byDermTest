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
  const [quantitySelected, setQuantitySelected]: any = useState(
    JSON.parse(localStorage.getItem("cart") || "[]").find(
      (x: any) => x.name === product.name
    )?.quantity
  );

  useEffect(()=>{
    const item = product;
    console.log(product)
    const quantity = product.quantity[0]
    const previousLocalStorageContent = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const selectedItem = previousLocalStorageContent.find((x: any) => {
      if (
        x.name === product.name 
      )
        return { ...item, quantity };
    });
    if(selectedItem)setQuantitySelected(quantity)
    console.log('>>>>>>>>>>>>>>>>',selectedItem, product, previousLocalStorageContent, '>>>>>>>>>>>>>>>>', quantitySelected)
  },[])
  const modalToggle = () => {
    setModalState(!modalState);
    const body = document.getElementsByTagName("body")[0];
    if (modalState)
      body.className =
        body.className
          .split(" overflow-visible")
          .join("")
          .split(" overflow-visible")
          .join("") + " overflow-visible";
    else
      body.className =
        body.className
          .split(" overflow-hidden")
          .join("")
          .split(" overflow-visible")
          .join("") + " overflow-hidden";
  };

  const changeCart = (item: product, quantity: any) => {
    const previousLocalStorageContent = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const selectedItem = previousLocalStorageContent.find((x: any) => {
      if (
        x.name === { ...item, quantity }.name &&
        x.quantity === { ...item, quantity }.quantity
      )
        return { ...item, quantity };
    });

    if (selectedItem) {
      removeProductsFromCart(item, quantity);
    } else {
      const quantitysToRemove = item.quantity.filter((x) => x !== quantity);
      quantitysToRemove.map((x) => {
        removeProductsFromCart(item, x);
      });
      addProductToCart(item, quantity);
    }
  };

  const addProductToCart = (item: product, quantity: any) => {
    const previousLocalStorageContent = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    localStorage.setItem(
      "cart",
      JSON.stringify([...previousLocalStorageContent, { ...item, quantity }])
    );
    setProductsOnCart(
      [...previousLocalStorageContent, { ...item, quantity }].length
    );
    modalToggle();
    setQuantitySelected(quantity);
  };

  const removeProductsFromCart = (item: product, quantity: any) => {
    const previousLocalStorageContent = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const newCart = previousLocalStorageContent.filter(
      (x: any) =>
        x.name !== { ...item, quantity }.name &&
        x.quantity !== { ...item, quantity }.quantity
    );
    console.log(newCart);

    localStorage.setItem("cart", JSON.stringify(newCart));

    setProductsOnCart(newCart.length);
    setQuantitySelected();
  };

  return (
    <div>
      <article
        key={product.imagePath}
        className="mt-4 w-full flex gap-4  h-fit"
      >
        <div className="flex flex-col gap-4  h-fit">
          {product &&
            product.quantity &&
            product.quantity.slice(0, 1).map((x) => {
              return (
                <div className="flex justify-center flex-col items-center gap-2 accent-tango-600">
                  <input
                    onClick={() => changeCart(product, x)}
                    type="radio"
                    name={`quantity${product.name}`}
                    checked={quantitySelected == product.quantity[0]}
                    className="w-6 h-6"
                  />
                  <label htmlFor="radio">{x}</label>
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
          <p title={product.name}
className="text-[20px] font-bold ">{product.name}</p>
          <p
            title={product.vehicle}
            className="text-[16px] mt-2 w-[calc(100%-32px)]"
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
            <p className="text-small text-tango-500 font-bold ">
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

            <p title={product.productFunction} className="text-small bg-nevada-500 inline text-white px-[12px] text-center w-fit py-[4px] rounded-[16px] h-fit">
              {product.productFunction}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full border border-solid border-gray-400"></div>
    </div>
  );
}
