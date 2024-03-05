import BACKEND_URL from "@/app/models/urls";
import { product } from "@/app/products/models/products.json";

function obtenerFechaArgentinaISO() {
    let fecha = new Date();
    let diferenciaHoras = -3 * 60; // Argentina tiene UTC-3
    let desplazamiento = diferenciaHoras * 60 * 1000;
    fecha.setTime(fecha.getTime() + desplazamiento);
    let fechaISO = fecha.toISOString();
    
    return fechaISO;
  }
  
  obtenerFechaArgentinaISO()


const createRecipe = async(license:string, products: any[]) => {
    await fetch(`${BACKEND_URL}recipes/add`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
      
        body: JSON.stringify({
          doctorLicense: license,
          date: obtenerFechaArgentinaISO().split('T')[0],
          products: products,
          hour: obtenerFechaArgentinaISO().split("T")[1].split(".")[0],
        })
      }).then((x)=>(x.json()));
    return 
} 

export default createRecipe;