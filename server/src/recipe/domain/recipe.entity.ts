//Creo mi entiedad
export interface RecipeEntity{
    id?: string;
    doctorLicense: number,
    doctorLastName: string,
    doctorName: string,
    date: string,
    hour: string, 
    placeOfPurchase: string,
    purchaseProvince: string,
    purchaseLocality: string,
    dateOfPurchase: string,
    product: string,
    quantity: string,
    price: number,
    count: number,
}