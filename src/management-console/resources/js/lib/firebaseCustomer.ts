import FirebaseClient, { FirebaseConfig } from './FirebaseClient'

const config: FirebaseConfig = {
    apiKey: process.env.MIX_FIREBASE_WEB_API_KEY_OWNER,
    authDomain: process.env.MIX_FIREBASE_WEB_AUTH_DOMAIN_OWNER,
    databaseURL: process.env.MIX_FIREBASE_WEB_DATABASE_URL_OWNER,
    projectId: process.env.MIX_FIREBASE_WEB_PROJECT_ID_OWNER,
    storageBucket: process.env.MIX_FIREBASE_WEB_STORAGE_BUCKET_OWNER,
    messagingSenderId: process.env.MIX_FIREBASE_WEB_MESSAGING_SENDER_ID_OWNER,
    appId: process.env.MIX_FIREBASE_WEB_APP_ID_OWNER,
}

export const firebaseBeautician = new FirebaseClient(config, 'beauticians')
