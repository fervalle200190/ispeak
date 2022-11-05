import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

// credentials of firebase
const firebaseConfig = {
     apiKey: "AIzaSyDdWi9W_IdsYAzlQuHdB-yQhafQZ97rFH0",
     authDomain: "ispeak-f31e1.firebaseapp.com",
     projectId: "ispeak-f31e1",
     storageBucket: "ispeak-f31e1.appspot.com",
     messagingSenderId: "786396996822",
     appId: "1:786396996822:web:be9bcaca0e5fa34dfe1577",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
const storage = getStorage();

export const uploadFile = async (file) => {
     const fileRef = ref(storage, v4());
     await uploadBytes(fileRef, file);
     const url = await getDownloadURL(fileRef);
     return url;
};

export default firebaseApp;

