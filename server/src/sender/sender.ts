import express from 'express';
import htmlContent from './htmlContent';
import fix from './fixVenom';
const useRouter = express.Router();
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const venom = require ('venom-bot');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// let clientVenom:any;
// venom
//   .create("session-name")
//   .then((client:any) =>{
//      clientVenom = client;
//     })
//   .catch((error:any) => {
//     console.log(error);
//   });


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
  const {doctorName, doctorLicense, products} = req.body
  const dom = new JSDOM(htmlContent);

const document = dom.window.document;

products.forEach((x: any)=>{
  switch (x.id) {
    case '2uh771rOX6HWiO7plKEn':
      x = {...x, quantity: 'blancoclasico'}
      break;
      case '8IAmxlvLfnz71mdZ6KGy':
        x = {...x, quantity: 'tonooscuro'}
        break;
        case 'L80CWGjIhk00DdCVdSPQ':
      x = {...x, quantity: 'tonoclaro'}
      break;
      case 'YlvtHFTv1oVSVsIQTLQ8':
      x = {...x, quantity: 'tonoclaro'}
      break;
      case 'vg8p3fx6Am1ieSR7XupP':
      x = {...x, quantity: 'tonomedio'}
      break;
    default:
      x = x;
      break;
  }
  console.log(x)
  document.getElementsByClassName(x.id)[0].getElementsByClassName(x.quantity)[0].classList.add("checked");

})
document.getElementById('doctorName').innerHTML = doctorName;
document.getElementById('license').innerHTML = doctorLicense;

const newHTML = (document.documentElement.outerHTML);

    convertirHTMLaImagen(newHTML).then(async(buffer) => {
        const directorioActual = __dirname;
        const nombreArchivo = 'canvas.png';
        const rutaArchivo = path.join(directorioActual, nombreArchivo);
        fs.writeFileSync(rutaArchivo, buffer);
        await convertirImagenAPDF(rutaArchivo, 'archive.pdf')
        const email = req.body.email
        const configEmail = {
            from: "bonodigital@byderm.com.ar",
            to: email,
            subject: '¡Gracias por tu Confianza! Aquí tienes un Cupón de Descuento',
            html: `<p>Hola, ¡Gracias por elegirnos! </p>
            <p>Podés encontrar los puntos de venta By Derm a continuación</p>
            <a href='https://byderm.com.ar/puntos-de-venta'>https://byderm.com.ar/puntos-de-venta</a>`,
            attachments:{
                filename: 'bonodigital.pdf',
                content: fs.createReadStream(path.join(__dirname, '../../archive.pdf'))
            }
          
          }
          await transporter.sendMail(configEmail);
          res.send('email enviado');


   
})
.catch((err)=>console.log(err))});


useRouter.post("/sendWhatsapp", async(req, res)=>{
    // const {number} = req.body;
    // await clientVenom
    // .sendFile(
    //     `549${number}@c.us`,
    //     path.join(__dirname, '../../archive.pdf'),
    //     'archive.pdf',
    //     '¡Hola! Queremos agradecerte por confiar en nuestros médicos y productos. Como muestra de nuestro agradecimiento, queremos ofrecerte un cupón de descuento del 25%. ¡Esperamos que lo disfrutes!'
    //   )
    res.send("Whats enviado")
    
})


export default useRouter;