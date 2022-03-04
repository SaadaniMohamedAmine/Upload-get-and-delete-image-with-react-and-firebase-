import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCghgylQANFGqrbNPI_2W5rEdGw8AzyvD4",
  authDomain: "file-uploader-react-firebase.firebaseapp.com",
  projectId: "file-uploader-react-firebase",
  storageBucket: "file-uploader-react-firebase.appspot.com",
  messagingSenderId: "932886735972",
  appId: "1:932886735972:web:1683dabc815110601c8371",
  measurementId: "G-T4KZ3CXCRX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
