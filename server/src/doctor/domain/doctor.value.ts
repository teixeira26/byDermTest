import { DoctorEntity } from "./doctor.entity";

export class DoctorValue implements DoctorEntity{
    name: string
    license: number
    lastName: string

    //Constructor que inicializa el entity
    constructor({name, license, lastName}:{name:string; license:number; lastName: string}){
        this.name = name;
        this.license = license;
        this.lastName = lastName;
    }

}