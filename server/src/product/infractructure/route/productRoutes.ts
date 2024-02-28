import express from 'express';
import { FirebaseProductRepository } from '../repositories/firebaseProductRepository';
import { ProductUseCase } from '../../application/productUseCase';
import { productController } from '../controller/productController';



//creo las instancias.
const productRepository = new FirebaseProductRepository(); 
const productUseCase = new ProductUseCase(productRepository);
const ProductController = new productController(productUseCase);

const useRouter = express.Router();

useRouter.post('/add', (req, res) => ProductController.addProduct(req, res));
useRouter.get('/list', (req, res) => ProductController.listProducts(req, res));
useRouter.get('/listByProductFunction', (req, res) => ProductController.listByProductFunction(req, res));
useRouter.delete('/delete/:id', (req, res) => ProductController.deleteProduct(req, res));
useRouter.put('/update/:id', (req, res) => ProductController.updateProduct(req, res));

export default useRouter;