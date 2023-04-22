import { initializeApp } from 'firebase/app';

import 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyD6XrGbtwpNBOybOGjNY6eNci26qDGuz6I',
    authDomain: 'fiufit-73a11.firebaseapp.com',
    databaseURL: 'https://fiufit-18294.firebaseio.com/',
    projectId: 'fiufit-73a11',
    storageBucket: 'fiufit-73a11.appspot.com',
    messagingSenderId: '587864716594',
    appId: '1:587864716594:web:30d86e78e5c21d366f132b',
    measurementId: 'G-TCBPRSHX8M',
};


const app = initializeApp(firebaseConfig);
export default {
    app
};