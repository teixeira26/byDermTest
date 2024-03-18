import {BOT_URL} from "@/app/models/urls";

const sendWhatsapp = async(number:string, doctorName: string, doctorLicense: string, products: any) => {
    await fetch(`${BOT_URL}send/sendWhatsapp`, {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
      
        //make sure to serialize your JSON body
        body: JSON.stringify({
          number,
          doctorName,
          doctorLicense,
          products
        })
      }).then((x)=>(x.json()));
    return 
}

export default sendWhatsapp;