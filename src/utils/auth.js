import {getAuth} from 'firebase/auth';
import {app} from './database.js';

export const auth = getAuth(app);

export {
  onAuthStateChanged,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from 'firebase/auth';
