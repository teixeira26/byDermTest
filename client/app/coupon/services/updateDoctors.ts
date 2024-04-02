import {BACKEND_URL} from "@/app/models/urls";

const updateDoctors = async(name:string, lastName: string, license: string, quantityOfRecipes: any, id: string) => {
    await fetch(`${BACKEND_URL}doctors/update/${id}`, {
        method: "put",
        headers: {
          'Content-Type': 'application/json'
        },
      
        //make sure to serialize your JSON body
        body: JSON.stringify({
          name,
          lastName,
          license,
          quantityOfRecipes
        })
      }).then((x)=>(x.json()));
    return 
}

export default updateDoctors;