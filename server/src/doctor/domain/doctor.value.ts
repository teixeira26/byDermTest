import { DoctorEntity } from "./doctor.entity";

export class DoctorValue implements DoctorEntity{
    name: string
    license: number

    //Constructor que inicializa el entity
    constructor({name, license, }:{name:string; license:number;}){
        this.name = name;
        this.license = license;
    }

}