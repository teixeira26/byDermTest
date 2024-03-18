import {BACKEND_URL} from "@/app/models/urls";

const sendEmail = async(email:string, doctorName: string, doctorLicense: string, products: any) => {
    await fetch(`${BACKEND_URL}send/sendEmail`, {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
      
        //make sure to serialize your JSON body
        body: JSON.stringify({
          email: email,
          doctorName,
          doctorLicense,
          products
        })
      }).then((x)=>(x.json()));
    return 
}

export default sendEmail;