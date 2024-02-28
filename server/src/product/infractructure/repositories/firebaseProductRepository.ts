import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase.config";
import { productValue } from "../../domain/product.value";
import { productEntity } from "../../domain/product.entity";

export class FirebaseProductRepository {
  //Register
  async addProduct(ProductValue: productValue): Promise<string | null> {
    try {
      const productData = {
        imageUrl: ProductValue.imageUrl,
        name: ProductValue.name,
        quantity: ProductValue.quantity,
        productFunction: ProductValue.productFunction,
        activeIngredient: ProductValue.activeIngredient,
        vehicle: ProductValue.vehicle,
        price: ProductValue.price,
        discount: ProductValue.discount,
      };

      const productsCollection = collection(db, "products");
      const docRef = await addDoc(productsCollection, productData);
      return docRef.id;
    } catch (error) {
      console.error("Error registering product:", error);
      return null;
    }
  }

  //List
  async listProducts(): Promise<productEntity[] | null> {
    try {
      const productsCollection = collection(db, "products");
      const querySnapshot = await getDocs(productsCollection);
      const products: productEntity[] = [];

      querySnapshot.forEach((doc) => {
        const productData = doc.data() as productEntity;
        const product: productEntity = { ...productData, id: doc.id };
        products.push(product);
      });

      return products;
    } catch (error) {
      console.error("Error listing products:", error);
      return null;
    }
  }

  async listProductsByProductFunction(
    productFunction: string
  ): Promise<productEntity[] | null> {
    try {
      const productsCollection = collection(db, "products");
      const querySnapshot = await getDocs(productsCollection);
      const products: productEntity[] = [];

      querySnapshot.forEach((doc) => {
        const productData = doc.data() as productEntity;
        const product: productEntity = { ...productData, id: doc.id };
        products.push(product);
      });

      return products;
    } catch (error) {
      console.error("Error listing products:", error);
      return null;
    }
  }

  //Delete
  async deleteProduct(productId: string): Promise<boolean | null> {
    try {
      const productDocRef = doc(db, "products", productId);
      await deleteDoc(productDocRef);
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  }

  //Update
  async updateProduct(
    productId: string,
    ProductValue: productValue
  ): Promise<boolean | null> {
    try {
      const productDocRef = doc(db, "products", productId);
      const productData = {
        imageUrl: ProductValue.imageUrl,
        name: ProductValue.name,
        quantity: ProductValue.quantity,
        productFunction: ProductValue.productFunction,
        activeIngredient: ProductValue.activeIngredient,
        vehicle: ProductValue.vehicle,
        price: ProductValue.price,
        discount: ProductValue.discount,
      };

      await updateDoc(productDocRef, productData);
      return true;
    } catch (error) {
      console.error("Error updating product:", error);
      return false;
    }
  }
}
