import express from 'express'
import doctorRoutes from './doctor/infractructure/route/doctorRoutes';
import recipeRoutes from './recipe/infractructure/route/recipeRoutes';
import productRoutes from './product/infractructure/route/productRoutes';
import { Request, Response } from "express";
import cors from 'cors'
import path from 'path'
const app = express();


const PORT = process.env.PORT || 3001;
app.use(cors({
  origin: ['http://localhost:3000', 'https://example2.com', 'http://104.131.67.42:3000', 'http://104.131.67.42']
}));

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Uso el enrutador de usuarios
app.use('/doctors', doctorRoutes);
app.use('/recipes', recipeRoutes);
app.use('/products', productRoutes);


app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });

// Inicio el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
