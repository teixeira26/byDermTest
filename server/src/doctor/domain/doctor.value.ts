import { DoctorEntity } from "./doctor.entity";

export class DoctorValue implements DoctorEntity{
    name: string
    license: number
    lastName: string
    quantityOfRecipes: [];

    //Constructor que inicializa el entity
    constructor({name, license, lastName, quantityOfRecipes}:{name:string; license:number; lastName: string, quantityOfRecipes: []}){
        this.name = name;
        this.license = license;
        this.lastName = lastName;
        this.quantityOfRecipes = quantityOfRecipes
    }

}