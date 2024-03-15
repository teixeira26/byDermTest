import {BACKEND_URL} from "../models/urls";

const getDoctorByLicense = async(license:string) => {
    const doctors = await fetch(`${BACKEND_URL}doctors/list`).then((x)=>(x.json()));
    return doctors.find((x: any)=>x.license === parseInt(license, 10))
}

export default getDoctorByLicense;