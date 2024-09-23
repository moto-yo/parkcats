// throw new Error("Replace src/app/lib/firebase.config.js with your own config");

// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGIN_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
}

// Initialize Firebase
let app

try {
  // console.log('getApps() =', getApps(), '\n');

  app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore()

  // console.log('app =', app, '\n');
  // console.log('auth =', auth, '\n');
  // console.log('db =', db, '\n');
} catch (error) {
  console.error(error)
}

const firebaseApp = app

export { firebaseApp }
