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
  const [quantitySelected, setQuantitySelected] = useState("");

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const selectedItem = cartItems.find((item: any) => {
      return item.name === product.name;
    });

    if (selectedItem) {
      setQuantitySelected(selectedItem.quantity);
    }
  }, [product]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const selectedItem = cartItems.find((item: any) => {
      return (item.name === product.name && item.quantity == product.quantity[0]);
    });

    if (selectedItem) {
      setQuantitySelected(selectedItem.quantity);
    }
    else{
      setQuantitySelected('')
    }
  }, [productsOnCart])

  const modalToggle = () => {
    setModalState(!modalState);
    const body = document.getElementsByTagName("body")[0];
    body.className = modalState
      ? body.className.replace(" overflow-visible", "") + " overflow-hidden"
      : body.className.replace(" overflow-hidden", "") + " overflow-visible";
  };

  const changeCart = (item: any, quantity: any) => {
    const previousLocalStorageContent = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const selectedItem = previousLocalStorageContent.find(
      (x: any) => x.name === item.name && x.quantity === quantity
    );
    if (selectedItem) {
      removeProductsFromCart(item, quantity);
    } else {
      addProductToCart(item, quantity);
    }
  };

  const addProductToCart = (item: any, quantity: any) => {
    const previousLocalStorageContent = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const newCart = [...previousLocalStorageContent, { ...item, quantity }];
    localStorage.setItem("cart", JSON.stringify(newCart));
    setProductsOnCart(newCart.length);
    setQuantitySelected(quantity);
    modalToggle();
  };

  const removeProductsFromCart = (item: any, quantity: any) => {
    const previousLocalStorageContent = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const newCart = previousLocalStorageContent.filter(
      (x: any) => x.name !== item.name || x.quantity !== quantity
    );
    localStorage.setItem("cart", JSON.stringify(newCart));
    setProductsOnCart(newCart.length);
    setQuantitySelected("");
  };

  return (
    <div onClick={() => changeCart(product, product.quantity[0])}
    >
      <p title={product.name} className="text-[20px] font-bold my-4">
        {product.name}
      </p>
      <article
        key={product.imagePath}
        className="mt-4 w-full flex gap-4  h-fit"
      >
        <div className="relative w-fit h-fit ">
          <img
            className="rounded-[16px] object-cover h-[20vh] min-w-[18vh] w-[18vh] md:h-[20vh] md:w-[20vh] cursor-pointer"
            alt={product.name}
            src={`/${product.imageUrl}`}
          />
        </div>

        <div className="min-w-[130px] sm:min-w-[130px] md:min-w-96">
          <p
            title={product.vehicle}
            className="text-[16px] w-[100%]"
          >
            {product.vehicle}
          </p>
          <p
            title={product.activeIngredient}
            className="ellipsis text-small mt-2 w-[100%] text-[#888888] uppercase"
          >
            {product.activeIngredient}
          </p>
        </div>
      </article>
      <div>
        <div className="my-4">
          <div className="flex justify-between my-2 mb-4 items-center">
            <div>
              <p className="text-small mb-4 flex flex-wrap">
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
                        (product.price[0].amount.toFixed(
                          2
                        ) as unknown as number) -
                          ((product.price[0].amount.toFixed(
                            2
                          ) as unknown as number) *
                            product.discount) /
                            100
                      )
                    : "???"}
                </span>
                <span className="text-[12px] relative text-white bg-tango-500 rounded-[32px] py-1 px-3 mt-[-1px] text-center font-bold ">
                  25% off
                </span>
              </p>
              <div className=" bg-nevada-500 inline-flex justify-center rounded-[32px] ">
                <p
                  title={product.productFunction}
                  className="text-small max-w-[180px] text-white px-[12px] text-center w-fit py-[4px] rounded-[16px] h-fit"
                >
                  {product.productFunction}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4  h-fit">
              {product &&
                product.quantity &&
                product.quantity.map((x: any) => {
                  return (
                    <div className="flex w-[48px] truncate max-w-[60px] overflow-hidden justify-center flex-col items-center gap-2 accent-tango-600">
                      <input
                        type="checkbox"
                        checked={quantitySelected == product.quantity[0]}
                        className="w-6 h-6 rounded-[50%]"
                      />
                      <label
                        className="w-[60px] elipse text-center min-w-[150px]"
                        htmlFor="radio "
                      >
                        {x === '30CÁPSULAS'? '30 cp.' : x === '60CÁPSULAS'? '60 cp.' : x}
                      </label>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border border-solid border-gray-400"></div>
    </div>
  );
}
