import express from 'express';
import { FirebaseRecipeRepository } from '../repositories/firebaseRecipeRepository';
import { RecipeUseCase } from '../../application/recipeUseCase';
import { recipeController } from '../controller/useController';


//creo las instancias.
const recipeRepository = new FirebaseRecipeRepository(); 
const recipeUseCase = new RecipeUseCase(recipeRepository);
const RecipeController = new recipeController(recipeUseCase);

const useRouter = express.Router();

useRouter.post('/add', (req, res) => RecipeController.addRecipe(req, res));
useRouter.get('/list', (req, res) => RecipeController.listRecipes(req, res));
useRouter.delete('/delete/:id', (req, res) => RecipeController.deleteRecipe(req, res));
useRouter.put('/update/:id', (req, res) => RecipeController.updateRecipe(req, res));

export default useRouter;