import BACKEND_URL from "@/app/models/urls";

const sendEmail = async(email:string) => {
    await fetch(`${BACKEND_URL}send/sendEmail`, {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
      
        //make sure to serialize your JSON body
        body: JSON.stringify({
          email: email,
        })
      }).then((x)=>(x.json()));
    return 
}

export default sendEmail;