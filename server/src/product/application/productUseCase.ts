import { ProductRepository } from "../domain/product.repository";
import { productValue } from "../domain/product.value";

export class ProductUseCase {

    //Inyecto las dependencias y facilito las pruebas initarias
    constructor(private readonly productRepository: ProductRepository) {}

    //Register
    public async addProduct({ imageUrl, name, quantity, productFunction, vehicle, activeIngredient, price, discount }:{
      imageUrl: string;
      name: string;
      quantity: number;
      productFunction: number;
      vehicle: string;
      activeIngredient: string;
      price: number;
      discount: number;
  }) {
        const useValue = new productValue({ imageUrl, name, quantity, productFunction, vehicle, activeIngredient, price, discount });
        
        const productCreated = await this.productRepository.addProduct(useValue)
        return productCreated
    }

    //List
    public async getProducts() {
        const products = await this.productRepository.listProducts();
        return products;
    }

    public async getProductsByProductFunction( productFunction:string ) {
      const products = await this.productRepository.listProductsByProductFunction( productFunction );
      return products;
  }

    //DELETE
    public async deleteProducts(productId: string): Promise<boolean | null> {
        try {
            const deleted = await this.productRepository.deleteProduct(productId);
            return deleted !== null ? true : false;  
        } catch (error) {
            console.error('Error deleting product:', error);
            return null;  
        }
    }
    
    //UPDATE
    public async updateProducts(
        productId: string,
        { imageUrl, name, quantity, productFunction, vehicle, activeIngredient, price, discount }:{
          imageUrl: string;
          name: string;
          quantity: number;
          productFunction: number;
          vehicle: string;
          activeIngredient: string;
          price: number;
          discount: number;
      }
      ): Promise<boolean | null> {
        try {
          const updated = await this.productRepository.updateProduct(productId, {
            imageUrl, name, quantity, productFunction, vehicle, activeIngredient, price, discount
          });
          return updated !== null ? true : false;
        } catch (error) {
          console.error('Error updating product:', error);
          return null;
        }
      }


}
