import { RecipeEntity } from "./recipe.entity";

export class RecipeValue implements RecipeEntity{
    products: number[]
    doctorLicense: number;
    date: string;
    hour: string;

    //Constructor que inicializa el entity
    constructor({ products, doctorLicense, date, hour }:{ hour:string; products:number[]; doctorLicense: number; date: string}){
        this.products = products;
        this.doctorLicense = doctorLicense;
        this.date = date;
        this.hour = hour;
    }

}