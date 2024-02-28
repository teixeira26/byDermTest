import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAEjWbqEH1safdGske_S4z5t9MjRaDXO8A",
  authDomain: "byderm-cuponera.firebaseapp.com",
  projectId: "byderm-cuponera",
  storageBucket: "byderm-cuponera.appspot.com",
  messagingSenderId: "37370142509",
  appId: "1:37370142509:web:66b31f3f2d115dc4ddfda4"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export { db, collection }; 
