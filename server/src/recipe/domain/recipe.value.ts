import { RecipeEntity } from "./recipe.entity";

export class RecipeValue implements RecipeEntity {
  products: number[];
  doctorLicense: number;
  date: string;
  hour: string;
  doctorLastName: string;
  doctorName: string;
  dateOfPurchase: string;
  placeOfPurchase: string;
  purchaseLocality: string;
  purchaseProvince: string;

  //Constructor que inicializa el entity
  constructor({
    products,
    doctorLicense,
    date,
    hour,
    doctorLastName,
    doctorName,
    dateOfPurchase,
    placeOfPurchase,
    purchaseLocality,
    purchaseProvince,
  }: {
    hour: string;
    products: number[];
    doctorLicense: number;
    date: string;
    doctorLastName: string;
    doctorName: string;
    dateOfPurchase: string;
    placeOfPurchase: string;
    purchaseLocality: string;
    purchaseProvince: string;
  }) {
    this.products = products;
    this.doctorLicense = doctorLicense;
    this.date = date;
    this.hour = hour;
    this.dateOfPurchase = dateOfPurchase;
    this.doctorName = doctorName;
    this.doctorLastName = doctorLastName;
    this.placeOfPurchase = placeOfPurchase;
    this.purchaseLocality = purchaseLocality;
    this.purchaseProvince = purchaseProvince;
  }
}
