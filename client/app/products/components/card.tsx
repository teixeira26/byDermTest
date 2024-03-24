import React, { useState } from 'react'
import Image from 'next/image'
import { product } from '../models/product'

type Props = {
    product: product
    modalState: any,
    setModalState: any,
    productsOnCart: any,
    setProductsOnCart: any
}


function formatCurrency(value:any) {
  // Convertir el valor a un número
  const numberValue = parseFloat(value);

  // Verificar si el valor es un número válido
  if (isNaN(numberValue)) {
      return 'Valor no válido';
  }

  // Formatear el número como moneda ARS
  const formattedValue = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(numberValue);

  return formattedValue;
}


export default function Card({product, modalState, setModalState, productsOnCart, setProductsOnCart}: Props) {
    const [quantitySelected, setQuantitySelected]: any = useState(JSON.parse(
        localStorage.getItem("cart") || "[]"
      ).find((x:any)=>x.name === product.name)?.quantity) 

    const modalToggle = () => {
        setModalState(!modalState);
        const body = document.getElementsByTagName("body")[0];
        if (modalState) body.className = body.className.split(' overflow-visible').join('').split(' overflow-visible').join('') + " overflow-visible";
        else body.className = body.className.split(' overflow-hidden').join('').split(' overflow-visible').join('') + " overflow-hidden";
      };

    const changeCart =(item: product, quantity:any)=>{

        const previousLocalStorageContent = JSON.parse(
            localStorage.getItem("cart") || "[]"
          );
          const selectedItem = previousLocalStorageContent.find((x: any)=>{
            if(x.name==={...item, quantity}.name && x.quantity==={...item, quantity}.quantity) return {...item, quantity}
        });
        console.log(selectedItem)

          if(selectedItem){
            removeProductsFromCart(item, quantity)
          }
          else{
              const quantitysToRemove = item.quantity.filter(x=>x!==quantity);
           quantitysToRemove.map(x=>{
                removeProductsFromCart(item, x)
            })
            addProductToCart(item, quantity)
          }
    }

    const addProductToCart = (item: product, quantity:any) => {
        const previousLocalStorageContent = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );
        localStorage.setItem(
          "cart",
          JSON.stringify([...previousLocalStorageContent, {...item, quantity}])
        );
        setProductsOnCart([...previousLocalStorageContent, {...item, quantity}].length);
        modalToggle();
        setQuantitySelected(quantity);
      };


      const removeProductsFromCart = (item: product, quantity:any) => {
        const previousLocalStorageContent = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );
        const newCart = previousLocalStorageContent.filter((x: any)=>(x.name!=={...item, quantity}.name && x.quantity!=={...item, quantity}.quantity));
        console.log(newCart)

        localStorage.setItem(
          "cart",
          JSON.stringify(newCart)
        );

        setProductsOnCart(newCart.length);
        setQuantitySelected();
      };
    
  return (
    <div>
        <article key={product.imagePath} className="mt-[94px] w-full">
              <div className="w-full mt-8 h-[40vh] md:h-[60vh] relative">
                <img
                  className="rounded-[16px] object-cover w-full h-[40vh] md:h-[60vh] cursor-pointer"
                  alt={product.name}
                  src={`/${product.imageUrl}`}
                 
                />
              </div>
              <p className="title font-bold mt-4">
                {product.name}
                <span className="ml-2 text-small">{quantitySelected ? quantitySelected : product.quantity[0]}</span>
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
               
                <span className="line-through mr-2">{product.price && formatCurrency(product.price[0].amount.toFixed(2))}</span>
              
                <span className="font-bold mr-2">
                  { product.price && product.price.find(x=>x.quantity === quantitySelected)? formatCurrency(product.price.find(x=>x.quantity === quantitySelected)?.amount.toFixed(2) as unknown as number - 
                      (product.price[0].amount.toFixed(2) as unknown as number * product.discount / 100)) : product.price && product.price[0] ? formatCurrency(product.price[0].amount.toFixed(2) as unknown as number - 
                      (product.price[0].amount.toFixed(2) as unknown as number * product.discount / 100)):'???'}
                 
                </span>
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
                  {product.productFunction}
                </p>
                <div className="flex gap-4">
                 { 
                 product && product.quantity && product.quantity.map((x)=>{
                   return ( <div className="flex justify-center flex-col items-center gap-2 accent-tango-600">
                    <input onClick={()=>changeCart(product, x)} type="radio" name={`quantity${product.name}`} checked={quantitySelected === x} className="w-8 h-8"/>
                    <label htmlFor="radio">{x}</label>
                  </div>)
                  })
                  }
                </div>
                
                {/* <FaPlus
                  size={32}
                  className="text-tango-500 hover:text-tango-600 active:text-tango-700 cursor-pointer"
                  onClick={() => addProductToCart(product)}
                /> */}
              </div>
            </article>
    </div>
  )
}
