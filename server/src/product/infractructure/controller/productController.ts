import { Request, Response } from "express";
import { ProductUseCase } from "../../application/productUseCase";

export class productController {

    private readonly productUseCase: ProductUseCase;

    constructor(productUseCase: ProductUseCase) {
      this.productUseCase = productUseCase;
    }

    async addProduct(req: Request, res: Response){
        const {imageUrl, name, quantity, productFunction, vehicle, activeIngredient, price, discount} = req.body;

        try {
            const productCreated = await this.productUseCase.addProduct({ imageUrl, name, quantity, productFunction, vehicle, activeIngredient, price, discount })
            res.status(201).json(productCreated);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error del servidor, Registerdoctor")
        }
    }

    //List
    async listProducts(req: Request, res: Response){
        try{
            const product = await this.productUseCase.getProducts();
            res.status(200).json(product) 
        }catch(error){
            res.status(500).send("Error del Servidor, ListProducts")
        }
    }

    async listByProductFunction(req: Request, res: Response){
      const productId = req.params.productId;
      try{
          const product = await this.productUseCase.getProductsByProductFunction(productId);
          res.status(200).json(product) 
      }catch(error){
          res.status(500).send("Error del Servidor, ListProducts")
      }
  }

    //Delete
    async deleteProduct(req: Request, res: Response){
        const productId = req.params.id;

        try{
            const deleted = await this.productUseCase.deleteProducts(productId);

            if(deleted){
                res.status(200).send("Se elimino el product con exito");
            }else{
                res.status(404).send("product no encontrado");
            }
        }catch(error){
            console.log(error);
            res.status(500).send("Error del servidor, deleteproduct");
        }
    }

    //Update
    async updateProduct(req: Request, res: Response) {
        const productId = req.params.id;
        const { imageUrl, name, quantity, productFunction, vehicle, activeIngredient, price, discount } = req.body;
    
        try {
          const updated = await this.productUseCase.updateProducts(productId, {
            imageUrl, name, quantity, productFunction, vehicle, activeIngredient, price, discount
          });
    
          if (updated) {
            res.status(200).send("Se actualizo el product con exito");
          } else {
            res.status(404).send("product no encontrado");
          }
        } catch (error) {
          console.log(error);
          res.status(500).send("Error del servidor, updateproduct");
        }
      }
  

}