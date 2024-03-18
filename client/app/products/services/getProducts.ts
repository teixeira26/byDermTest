import { BACKEND_URL } from "@/app/models/urls";


const getProducts = async() => {
    const products = await fetch(`${BACKEND_URL}products/list`).then((x)=>(x.json()));
    console.log(products)
    return products
}

export default getProducts;