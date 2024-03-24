import {BACKEND_URL} from "@/app/models/urls";

const signUp = async( doctorName: string,doctorLastName:string, doctorLicense: string) => {
    await fetch(`${BACKEND_URL}doctors/register`, {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
      
        //make sure to serialize your JSON body
        body: JSON.stringify({
          name: doctorName,
          lastName: doctorLastName,
          license: parseInt(doctorLicense, 10),
        })
      }).then((x)=>(x.json()));
    return 
}

export default signUp;