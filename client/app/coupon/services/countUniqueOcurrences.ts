import { product } from "@/app/products/models/products.json";

function countUniqueOccurrences(arr:product[]) {
    // Creamos un objeto para almacenar el conteo de cada elemento
    const countMap:any = {};

    // Recorremos el array original y contamos las ocurrencias de cada elemento
    arr.forEach(item => {
        countMap[item.name] = (countMap[item.name] || 0) + 1;
    });

    // Creamos un nuevo array de objetos con los elementos únicos y su conteo de ocurrencias
    const uniqueOccurrences = Object.keys(countMap).map(name => ({
        name: name,
        count: countMap[name]
    }));

    return uniqueOccurrences;
}

export default countUniqueOccurrences;