import express from 'express';
const useRouter = express.Router();
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');


const fs = require('fs');
const pdf = require('html-pdf');

const opcionesPDF = {
    format: 'A4',
    orientation: 'portrait'
};



const transporter = nodemailer.createTransport(smtpTransport({
  host: 'mail.byderm.com.ar',
  secureConnection: false,
  tls: {
    rejectUnauthorized: false
  },
  port: 587,
  auth: {
      user: 'bonodigital@byderm.com.ar',
      pass: '3AM*Hc72yL'
  }
}));



useRouter.post('/sendEmail', async(req, res) =>{


    console.log(req.body)
    const email = req.body.email
    const configEmail = {
        from: "bonodigital@byderm.com.ar",
        to: email,
        subject: '¡Gracias por elegirnos! Actualizaciones emocionantes en camino',
        html: '<p>Hola</p>'
      
      }
      await transporter.sendMail(configEmail);
      res.send('email enviado');
});


export default useRouter;