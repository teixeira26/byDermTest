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

export default function CardUpside({
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
      return (item.name === product.name && item.quantity == product.quantity[0]) ;
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
    <>
       {product ?<div className="flex flex-col justify-start p-[1px] " onClick={()=>changeCart(product, product.quantity[0])}>
              {quantitySelected == product.quantity[0] ? 
              <div className="flex justify-end">
              <img src="check.png" alt='iconChecked' className="w-6 h-6 absolute translate-x-[8px] translate-y-[-8px]" />

              </div>
              :<></>}
<div className="w-[100%] aspect-square">
<Image
  src={`/${product.imageUrl}`}
  alt=""
  layout="responsive"
  width={100}
  height={100}
  className={"rounded-[16px] mb-4 aspect-square object-contain"}
/> 
</div>
           <p className={`font-bold text-[16px] ${quantitySelected == product.quantity[0] ? 'text-tango-500' : ''}`}>{product.name} </p>
            <p className="font-normal text-[12px]">{product.quantity[0]}</p>
          </div>
        :
        <h2>skaoksa</h2>
        
        }
</>
  );
}
