//Creo el modelo del CRUD
export interface RecipeModel {
  doctorLicense: number,
  doctorLastName: string,
  doctorName: string,
  products: number[],
  date: string,
  hour: string, 
  placeOfPurchase: string,
  purchaseProvince: string,
  purchaseLocality: string,
  dateOfPurchase: string,
  }