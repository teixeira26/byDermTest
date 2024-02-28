import { RecipeEntity } from "./recipe.entity";
import { RecipeValue } from "./recipe.value";


//Creo una interfaz basado en el entity
export interface RecipeRepository {
    addRecipe(user: RecipeEntity): Promise<string | null>;
    listRecipes(): Promise<RecipeEntity[] | null>;
    deleteRecipe(doctorId: string): Promise<boolean | null>;
    updateRecipe(doctorId: string, user: RecipeValue): Promise<boolean | null>; 
}