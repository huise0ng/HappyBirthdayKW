
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC8YqhHLYw10HjKDFOmqFkEZkvEgPi4W7o",
  authDomain: "kangwon-223d1.firebaseapp.com",
  projectId: "kangwon-223d1",
  storageBucket: "kangwon-223d1.appspot.com",
  messagingSenderId: "471904847091",
  appId: "1:471904847091:web:dd54c4133d9ebcf4a7e386",
  measurementId: "G-W7Z6MD9V5K"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
