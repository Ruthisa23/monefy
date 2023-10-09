// config de firebase 
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBH1oP-5aAdfmru7daeJMHU2lW9857V6YU",
    authDomain: "ejemplo-app-d03df.firebaseapp.com",
    databaseURL: "https://ejemplo-app-d03df-default-rtdb.firebaseio.com",
    projectId: "ejemplo-app-d03df",
    storageBucket: "ejemplo-app-d03df.appspot.com",
    messagingSenderId: "810467369215",
    appId: "1:810467369215:web:8214928acc69012e88acca"
  };
  
  const app = initializeApp(firebaseConfig);
  export default app;