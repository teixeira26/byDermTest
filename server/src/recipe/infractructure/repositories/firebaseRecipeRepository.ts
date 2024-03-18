
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

import { db } from '../../../firebase/firebase.config';
import { RecipeValue } from '../../domain/recipe.value';
import { RecipeEntity } from '../../domain/recipe.entity';

export class FirebaseRecipeRepository {

  //Register
    async addRecipe(RecipeValue: RecipeValue): Promise<string | null> {
        try {
          // ConvierteRecipeValue a un objeto plano
          const recipeData = {
            date:RecipeValue.date,
            doctorLicense:RecipeValue.doctorLicense,
            products: RecipeValue.products,
            hour: RecipeValue.hour,
            doctorLastName: RecipeValue.doctorLastName,
            doctorName: RecipeValue.doctorName,
            placeOfPurchase: RecipeValue.placeOfPurchase,
            purchaseLocality: RecipeValue.purchaseLocality,
            purchaseProvince: RecipeValue.purchaseProvince,
            dateOfPurchase: RecipeValue.dateOfPurchase
          };
          console.log(recipeData, RecipeValue)
          const recipesCollection = collection(db, 'recipes');
          const docRef = await addDoc(recipesCollection, recipeData);
          return docRef.id;
        } catch (error) {
          console.error('Error registering recipe:', error);
          return null;
        }
      }

  //List
  async listRecipes(): Promise<RecipeEntity[] | null> {
    try {
      const recipesCollection = collection(db, 'recipes');
      const querySnapshot = await getDocs(recipesCollection);
      const recipes: RecipeEntity[] = [];

      querySnapshot.forEach((doc:any) => {
        const recipeData = doc.data() as RecipeEntity;
        const recipe: RecipeEntity = { ...recipeData, id: doc.id };
        recipes.push(recipe);
      });

      return recipes;
    } catch (error) {
      console.error('Error listing recipes:', error);
      return null;
    }
  }

  //Delete
  async deleteRecipe(recipeId: string): Promise<boolean | null> {
    try {
        const recipeDocRef = doc(db, 'recipes', recipeId);
        await deleteDoc(recipeDocRef);
        return true;
    } catch (error) {
        console.error('Error deleting recipe:', error);
        return false;  
    }
}

//Update
async updateRecipe(recipeId: string,RecipeValue:RecipeValue): Promise<boolean | null> {
  try {
    const recipeDocRef = doc(db, 'recipes', recipeId);
    const recipeData = {
      date:RecipeValue.date,
      doctorLicense:RecipeValue.doctorLicense,
      products: RecipeValue.products,
      hour: RecipeValue.hour,
      doctorLastName: RecipeValue.doctorLastName,
      doctorName: RecipeValue.doctorName,
      placeOfPurchase: RecipeValue.placeOfPurchase,
      purchaseLocality: RecipeValue.purchaseLocality,
      purchaseProvince: RecipeValue.purchaseProvince,
      dateOfPurchase: RecipeValue.dateOfPurchase
    };

    await updateDoc(recipeDocRef, recipeData);
    return true;
  } catch (error) {
    console.error('Error updating recipe:', error);
    return false; 
  }
}
}
