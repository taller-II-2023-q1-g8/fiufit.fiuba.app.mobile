import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD6XrGbtwpNBOybOGjNY6eNci26qDGuz6I',
  authDomain: 'fiufit-73a11.firebaseapp.com',
  databaseURL: 'https://fiufit-18294.firebaseio.com/',
  projectId: 'fiufit-73a11',
  storageBucket: 'fiufit-73a11.appspot.com',
  messagingSenderId: '587864716594',
  appId: '1:587864716594:web:30d86e78e5c21d366f132b',
  measurementId: 'G-TCBPRSHX8M'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default {
  app
};
