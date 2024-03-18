"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass, FaCartShopping, FaPlus } from "react-icons/fa6";
import ContentLoader from "react-content-loader";
import { useRouter } from "next/navigation";
import getProducts from "./services/getProducts";
import Card from "./components/card";
import { product } from "./models/product";


export default function Page() {
  const [productsOnCart, setProductsOnCart] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [productsFiltered, setProductsFiltered] = useState<product[] | false>(false);
  const [modalState, setModalState] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState('')
  const router = useRouter()

  const getProductsFunction = async()=>{
    const products =  await getProducts();
    setProductsFiltered(products)
  }

  useEffect(() => {
    getProductsFunction()
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

 

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
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
          width={60}
          height={60}
          src={"/logo.png"}
        />
      
        <div>
          <Link href="/coupon">
            <FaCartShopping
              className="text-tango-500 hover:text-tango-600 active:text-tango-700 mr-8"
              size={54}
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
        {hydrated && productsFiltered ? (
          <>
         {['HIGIENE', 'SERUMS', 'HIDRATACIÓN', 'TRATAMIENTOS', 'CORPORALES', 'FOTOPROTECCIÓN FPS 60', 'CAPILARES', 'SUPLEMENTOS DIETARIOS'].map((x, y)=>{
           return(
           <>
           <div className={`w-full rounded-[5px] bg-white border-solid border-2 border-nevada-500 ${y === 0 ? 'mt-[96px]' : 'mt-[16px]'} flex justify-between items-center`}>
           <p className="title text-nevada-500 pl-4 py-2">{x}</p>
           <div onClick={()=>activeSection === x ? setActiveSection('') : setActiveSection(x)} className={`border-solid border-r-[2px] border-b-[2px] border-nevada-500 w-4 h-4 mr-6 origin-center ${activeSection === x ? 'rotateAnimation rotate-[45deg]' : 'rotate-[-45deg] removeRotateAnimation' }`}>
           </div>
         </div>
        
         { activeSection === x &&
         
         <div className=' expandAnimation overflow-hidden'>
         {productsFiltered.map((product) => (
                             <Card product={product} setProductsOnCart={setProductsOnCart} productsOnCart={productsOnCart} setModalState={setModalState} modalState={modalState}/>
           ))}
           </div>
           }
           </>)
         }
         )}
           
            </>
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
