//Creo mi entiedad
export interface RecipeEntity{
    id?: string;
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