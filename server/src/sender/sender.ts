import express from 'express';
const useRouter = express.Router();
const nodemailer = require("nodemailer");

const fs = require('fs');
const pdf = require('html-pdf');

const opcionesPDF = {
    format: 'A4',
    orientation: 'portrait'
};



const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "kurosaki.math@gmail.com",
    pass: "fsoouvhiytqccuxk",
  },
});



useRouter.post('/sendEmail', async(req, res) =>{


    console.log(req.body)
    const email = req.body.email
    const configEmail = {
        from: "kurosaki.math@gmail.com",
        to: email,
        subject: '¡Gracias por elegirnos! Actualizaciones emocionantes en camino',
        html: '<p>Hola</p>'
      
      }
      await transporter.sendMail(configEmail);
      res.send('email enviado');
});


export default useRouter;