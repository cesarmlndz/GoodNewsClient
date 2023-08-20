import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

console.log(process.env.REACT_APP_API_KEY.slice(1, -2))

const firebaseConfig = {
  apiKey: "AIzaSyCPz_NVx7K2bT3jYGmEZN7SL3nxdY_4WQU",
  authDomain: "goodnewsx-87b94.firebaseapp.com",
  projectId: "goodnewsx-87b94",
  storageBucket: "goodnewsx-87b94.appspot.com",
  messagingSenderId: "898998222440",
  appId: "1:898998222440:web:839b66660fd5856967c5dd",
  measurementId: "G-95ZXXT30S2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
