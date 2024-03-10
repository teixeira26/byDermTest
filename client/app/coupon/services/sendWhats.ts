import BACKEND_URL from "@/app/models/urls";

const sendWhatsapp = async(number:string) => {
    await fetch(`${BACKEND_URL}send/sendWhatsapp`, {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
      
        //make sure to serialize your JSON body
        body: JSON.stringify({
          number,
        })
      }).then((x)=>(x.json()));
    return 
}

export default sendWhatsapp;