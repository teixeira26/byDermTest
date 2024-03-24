import express from 'express'
import doctorRoutes from './doctor/infractructure/route/doctorRoutes';
import recipeRoutes from './recipe/infractructure/route/recipeRoutes';
import productRoutes from './product/infractructure/route/productRoutes';
import sendRoutes from './sender/sender';
import { Request, Response } from "express";
import cors from 'cors'
const app = express();
import morgan from "morgan";


const PORT = process.env.PORT || 3001;

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://104.131.67.42:3000/', 'http://104.131.67.42', 'https://bonodigital.byderm.com.ar', 'https://www.bonodigital.byderm.com.ar'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Middleware para parsear el cuerpo de las solicitudes como JSON


// Uso el enrutador de usuarios
app.use('/doctors', doctorRoutes);
app.use('/recipes', recipeRoutes);
app.use('/products', productRoutes);
app.use('/send', sendRoutes);
app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });

// Inicio el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
