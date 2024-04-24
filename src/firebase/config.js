import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyD_K0XZv-LfBiVvPxqzipllPa6HufbNkv0',
  authDomain: 'refferity.firebaseapp.com',
  projectId: 'refferity',
  storageBucket: 'refferity.appspot.com',
  messagingSenderId: '297250691277',
  appId: '1:297250691277:web:f04011f65b745430943184',
  measurementId: 'G-RE2D4FWK49',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const provider = new GoogleAuthProvider();
