import { productEntity } from "./product.entity";
import { productValue } from "./product.value";



//Creo una interfaz basado en el entity
export interface ProductRepository {
    addProduct(user: productEntity): Promise<string | null>;
    listProducts(): Promise<productEntity[] | null>;
    listProductsByProductFunction( productFunction: string ): Promise<productEntity[] | null>;
    deleteProduct(doctorId: string): Promise<boolean | null>;
    updateProduct(doctorId: string, user: productValue): Promise<boolean | null>; 
}