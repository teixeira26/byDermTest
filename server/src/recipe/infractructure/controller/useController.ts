import { Request, Response } from "express";
import { RecipeUseCase } from "../../application/recipeUseCase";

export class recipeController {

    private readonly recipeUseCase: RecipeUseCase;

    constructor(recipeUseCase: RecipeUseCase) {
      this.recipeUseCase = recipeUseCase;
    }

    async addRecipe(req: Request, res: Response){
        const {date, products, doctorLicense, hour, doctorLastName, doctorName, placeOfPurchase, purchaseLocality, purchaseProvince, dateOfPurchase} = req.body;

        try {
            const recipeCreated = await this.recipeUseCase.addRecipe({ date, products, doctorLicense, hour, doctorLastName, doctorName, placeOfPurchase, purchaseLocality, purchaseProvince, dateOfPurchase})
            res.status(201).json(recipeCreated);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error del servidor, Registerdoctor")
        }
    }

    //List
    async listRecipes(req: Request, res: Response){
        try{
            const recipe = await this.recipeUseCase.getRecipes();
            res.status(200).json(recipe) 
        }catch(error){
            res.status(500).send("Error del Servidor, ListRecipes")
        }
    }

    //Delete
    async deleteRecipe(req: Request, res: Response){
        const recipeId = req.params.id;

        try{
            const deleted = await this.recipeUseCase.deleteRecipes(recipeId);

            if(deleted){
                res.status(200).send("Se elimino el Recipe con exito");
            }else{
                res.status(404).send("Recipe no encontrado");
            }
        }catch(error){
            console.log(error);
            res.status(500).send("Error del servidor, deleteRecipe");
        }
    }

    //Update
    async updateRecipe(req: Request, res: Response) {
        const recipeId = req.params.id;
        const { date, products, doctorLicense, hour, doctorLastName, doctorName, placeOfPurchase, purchaseLocality, purchaseProvince, dateOfPurchase} = req.body;
    
        try {
          const updated = await this.recipeUseCase.updateRecipe(recipeId, {
            date, products, doctorLicense, hour, doctorLastName, doctorName, placeOfPurchase, purchaseLocality, purchaseProvince, dateOfPurchase
          });
    
          if (updated) {
            res.status(200).send("Se actualizo el Recipe con exito");
          } else {
            res.status(404).send("Recipe no encontrado");
          }
        } catch (error) {
          console.log(error);
          res.status(500).send("Error del servidor, updateRecipe");
        }
      }
  

}