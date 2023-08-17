import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

console.log(process.env.REACT_APP_API_KEY.slice(1, -2))

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY.slice(1, -2),
  authDomain: process.env.REACT_APP_AUTH_DOMAIN.slice(1, -2),
  projectId: process.env.REACT_APP_PROJECT_ID.slice(1, -2),
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET.slice(1, -2),
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID.slice(1, -2),
  appId: process.env.REACT_APP_APP_ID.slice(1, -2),
  measurementId: process.env.REACT_APP_MEASUREMENT_ID.slice(1, -2)
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
