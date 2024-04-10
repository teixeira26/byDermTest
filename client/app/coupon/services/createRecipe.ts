import {BACKEND_URL} from "@/app/models/urls";

function obtenerFechaArgentinaISO() {
    let fecha = new Date();
    let diferenciaHoras = -3 * 60; // Argentina tiene UTC-3
    let desplazamiento = diferenciaHoras * 60 * 1000;
    fecha.setTime(fecha.getTime() + desplazamiento);
    let fechaISO = fecha.toISOString();
    
    return fechaISO;
  }
  
  obtenerFechaArgentinaISO()


const createRecipe = async(doctor:any, products: any[]) => {
    products.forEach(async (product)=>{
      console.log(product, 'jqwijwqi')
      await fetch(`${BACKEND_URL}recipes/add`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
      
        body: JSON.stringify({
          doctorLicense: doctor.license,
          date: obtenerFechaArgentinaISO().split('T')[0],
          products: products,
          product: product.name,
          quantity: product.price[0].quantity,
          price: product.price[0].amount,
          count: product.count, 
          hour: obtenerFechaArgentinaISO().split("T")[1].split(".")[0],
          doctorLastName:  doctor.lastName,
          doctorName: doctor.name,
          placeOfPurchase: '',
          purchaseLocality: "",
          purchaseProvince: "",
          dateOfPurchase: ""
        })
      }).then((x)=>(x.json()));
    })
    
    return 
} 

export default createRecipe;