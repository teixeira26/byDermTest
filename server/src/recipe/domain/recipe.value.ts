import { RecipeEntity } from "./recipe.entity";

export class RecipeValue implements RecipeEntity {
  doctorLicense: number;
  date: string;
  hour: string;
  doctorLastName: string;
  doctorName: string;
  dateOfPurchase: string;
  placeOfPurchase: string;
  purchaseLocality: string;
  purchaseProvince: string;
  product: string;
  quantity: string;
  price: number;
  count: number;

  //Constructor que inicializa el entity
  constructor({
    doctorLicense,
    date,
    hour,
    doctorLastName,
    doctorName,
    dateOfPurchase,
    placeOfPurchase,
    purchaseLocality,
    purchaseProvince,
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
    dateOfPurchase: string;
    placeOfPurchase: string;
    purchaseLocality: string;
    purchaseProvince: string;
    product: string;
    quantity: string;
    price: number;
    count: number;
  }) {
    this.doctorLicense = doctorLicense;
    this.date = date;
    this.hour = hour;
    this.dateOfPurchase = dateOfPurchase;
    this.doctorName = doctorName;
    this.doctorLastName = doctorLastName;
    this.placeOfPurchase = placeOfPurchase;
    this.purchaseLocality = purchaseLocality;
    this.purchaseProvince = purchaseProvince;
    this.product = product;
    this.quantity = quantity;
    this.price = price;
    this.count = count;
  }
}
