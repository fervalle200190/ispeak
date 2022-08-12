import { initializeApp } from "firebase/app";

// credentials of firebase
const firebaseConfig = {
  apiKey: "AIzaSyDdWi9W_IdsYAzlQuHdB-yQhafQZ97rFH0",
  authDomain: "ispeak-f31e1.firebaseapp.com",
  projectId: "ispeak-f31e1",
  storageBucket: "ispeak-f31e1.appspot.com",
  messagingSenderId: "786396996822",
  appId: "1:786396996822:web:be9bcaca0e5fa34dfe1577"
};


const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
