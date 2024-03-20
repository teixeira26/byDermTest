import {BACKEND_URL} from "@/app/models/urls";

const signUp = async( doctorName: string,doctorLastName:string, doctorLicense: string) => {
    await fetch(`${BACKEND_URL}doctors/register`, {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
      
        //make sure to serialize your JSON body
        body: JSON.stringify({
          doctorName,
          doctorLicense,
          doctorLastName
        })
      }).then((x)=>(x.json()));
    return 
}

export default signUp;