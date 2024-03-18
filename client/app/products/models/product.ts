export interface product {
    imagePath: string
    imageUrl: string
    category: string
    quantity: string[]
    name: string
    discount: number
    vehicle: string
    activeIngredient: string
    productFunction: string
    price: Price[]
  }
  
  export interface Price {
    quantity: string
    amount: number
  }


  