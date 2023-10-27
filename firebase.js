// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBaG2isEZcX-tVBkIrWuHVekoIeKzyf7hA',
  authDomain: 'employsync.firebaseapp.com',
  projectId: 'employsync',
  storageBucket: 'employsync.appspot.com',
  messagingSenderId: '363824304945',
  appId: '1:363824304945:web:02b7dd76b3c4c52cb71610',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };
