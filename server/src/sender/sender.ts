import express from 'express';
const useRouter = express.Router();
const nodemailer = require("nodemailer");

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
        html: "<p>¡Queridos usuarios!</p><p>Queremos expresar nuestro más sincero agradecimiento por elegir nuestra aplicación. Vuestra confianza y apoyo son lo que nos impulsa a seguir adelante. Estamos trabajando incansablemente para mejorar vuestra experiencia y ofreceros las mejores funciones posibles. Os pedimos paciencia mientras continuamos construyendo y perfeccionando nuestra aplicación para satisfacer todas vuestras necesidades. ¡Gracias por ser parte de este emocionante viaje con nosotros!</p>",
      
      }
      await transporter.sendMail(configEmail);
      res.send('email enviado');
});


export default useRouter;