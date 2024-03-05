import { product } from "@/app/products/models/products.json";


function countUniqueOccurrences(array: product[]) {
    // Creamos un objeto para almacenar la cuenta de objetos
    const countMap = {} as any;

    // Recorremos el array de objetos y contamos cuántas veces aparece cada uno
    array.forEach((objeto:any) => {
        const clave = JSON.stringify(objeto); // Convertimos el objeto a una cadena JSON para usarlo como clave
        countMap[clave] = (countMap[clave] || 0) + 1; // Incrementamos el contador para esta clave
    });

    // Convertimos el objeto de conteo de nuevo a un array de objetos con la propiedad count
    const resultado = Object.keys(countMap).map(clave => {
        const objeto = JSON.parse(clave); // Convertimos la clave JSON de vuelta a un objeto
        return { ...objeto, count: countMap[clave] }; // Añadimos la propiedad count al objeto
    });

    return resultado;
}

export default countUniqueOccurrences;
