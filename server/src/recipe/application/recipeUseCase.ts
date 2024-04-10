import { RecipeRepository } from "../domain/recipe.repository";
import { RecipeValue } from "../domain/recipe.value";

export class RecipeUseCase {
  //Inyecto las dependencias y facilito las pruebas initarias
  constructor(private readonly recipeRepository: RecipeRepository) {}

  //Register
  public async addRecipe({
    date,
    doctorLicense,
    hour,
    doctorLastName,
    doctorName,
    placeOfPurchase,
    purchaseLocality,
    purchaseProvince,
    dateOfPurchase,
    product,
    quantity,
    price,
    count,
  }: {
    hour: string;
    doctorLicense: number;
    date: string;
    doctorLastName: string;
    doctorName: string;
    placeOfPurchase: string;
    purchaseLocality: string;
    purchaseProvince: string;
    dateOfPurchase: string;
    product: string;
    quantity: string;
    price: number;
    count: number;
  }) {
    const useValue = new RecipeValue({
      date,
      doctorLicense,
      hour,
      doctorLastName,
      doctorName,
      placeOfPurchase,
      purchaseLocality,
      purchaseProvince,
      dateOfPurchase,
      product,
      quantity,
      price,
      count,
    });

    const recipeCreated = await this.recipeRepository.addRecipe(useValue);
    return recipeCreated;
  }

  //List
  public async getRecipes() {
    const doctors = await this.recipeRepository.listRecipes();
    return doctors;
  }

  //DELETE
  public async deleteRecipes(recipeId: string): Promise<boolean | null> {
    try {
      const deleted = await this.recipeRepository.deleteRecipe(recipeId);
      return deleted !== null ? true : false;
    } catch (error) {
      console.error("Error deleting doctor:", error);
      return null;
    }
  }

  //UPDATE
  public async updateRecipe(
    recipeId: string,
    {
      date,
      doctorLicense,
      hour,
      doctorLastName,
      doctorName,
      placeOfPurchase,
      purchaseLocality,
      purchaseProvince,
      dateOfPurchase,
      product,
      quantity,
      price,
      count,
    }: {
      hour: string;
      doctorLicense: number;
      date: string;
      doctorLastName: string;
      doctorName: string;
      placeOfPurchase: string;
      purchaseLocality: string;
      purchaseProvince: string;
      dateOfPurchase: string;
      product: string;
      quantity: string;
      price: number;
      count: number;
    }
  ): Promise<boolean | null> {
    try {
      const updated = await this.recipeRepository.updateRecipe(recipeId, {
        date,
        doctorLicense,
        hour,
        doctorLastName,
        doctorName,
        placeOfPurchase,
        purchaseLocality,
        purchaseProvince,
        dateOfPurchase,
        product,
        quantity,
        price,
        count,
      });
      return updated !== null ? true : false;
    } catch (error) {
      console.error("Error updating doctor:", error);
      return null;
    }
  }
}
