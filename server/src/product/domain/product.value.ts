import { productEntity } from "./product.entity"

export class productValue implements productEntity{
    imageUrl: string
    name: string
    quantity: number
    productFunction: number
    vehicle: string
    activeIngredient: string
    price: number
    discount: number

    //Constructor que inicializa el entity
    constructor({ imageUrl, name, quantity, productFunction, vehicle, activeIngredient, price, discount }:{
        imageUrl: string;
        name: string;
        quantity: number;
        productFunction: number;
        vehicle: string;
        activeIngredient: string;
        price: number;
        discount: number;
    }){
        this.imageUrl = imageUrl
        this.name = name
        this.quantity = quantity
        this.productFunction = productFunction
        this.vehicle = vehicle
        this.activeIngredient = activeIngredient
        this.price = price
        this.discount = discount
    }

}