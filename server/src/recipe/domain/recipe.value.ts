import { RecipeEntity } from "./recipe.entity";

export class RecipeValue implements RecipeEntity{
    products: number[]
    doctorLicense: number;
    date: string

    //Constructor que inicializa el entity
    constructor({ products, doctorLicense, date }:{ products:number[]; doctorLicense: number; date: string}){
        this.products = products;
        this.doctorLicense = doctorLicense;
        this.date = date;
    }

}