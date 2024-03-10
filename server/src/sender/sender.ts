import express from 'express';
import htmlContent from './htmlContent';
const useRouter = express.Router();
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const puppeteer = require('puppeteer');
const path = require('path');



const fs = require('fs');


async function convertirHTMLaImagen(htmlString: any) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width:1200, height: 1803 });
    await page.setContent(htmlString);
    const screenshotBuffer = await page.screenshot({ encoding: 'binary' });
    await browser.close();
    return screenshotBuffer;
  }


  async function convertirImagenAPDF(imagenPath: any, pdfPath: any) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(`file://${imagenPath}`);
  
    // Esperar a que la imagen se cargue completamente
    await page.waitForSelector('img');
  

    await page.addStyleTag({
        content: `
          img {
            width: 90% !important;
            height: 90% !important;
          }
        `
      });

    // Crear un archivo PDF con la imagen
    await page.pdf({ path: pdfPath });
  
    await browser.close();
  
    return pdfPath;
  }
  


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

    convertirHTMLaImagen(htmlContent).then(async(buffer) => {
        const directorioActual = __dirname;
        const nombreArchivo = 'canvas.png';
        const rutaArchivo = path.join(directorioActual, nombreArchivo);
        fs.writeFileSync(rutaArchivo, buffer);
        await convertirImagenAPDF(rutaArchivo, 'archive.pdf')
        console.log(req.body)
        const email = req.body.email
        const configEmail = {
            from: "bonodigital@byderm.com.ar",
            to: email,
            subject: '¡Gracias por tu Confianza! Aquí tienes un Cupón de Descuento',
            html: '<p>¡Hola! Queremos agradecerte por confiar en nuestros médicos y productos. Como muestra de nuestro agradecimiento, queremos ofrecerte un cupón de descuento del 25%. ¡Esperamos que lo disfrutes!</p>',
            attachments:{
                filename: 'bonodigital.pdf',
                content: fs.createReadStream(path.join(__dirname, '../../archive.pdf'))
            }
          
          }
          await transporter.sendMail(configEmail);
          res.send('email enviado');


   
}).catch((err)=>console.log(err))});


export default useRouter;