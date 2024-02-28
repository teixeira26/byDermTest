//Creo el modelo del CRUD
export interface RecipeModel {
    imageUrl: string,
    name: string,
    quantity: number,
    productFunction: number,
    vehicle: string,
    activeIngredient: string,
    price: number,
    discount: number,
  }