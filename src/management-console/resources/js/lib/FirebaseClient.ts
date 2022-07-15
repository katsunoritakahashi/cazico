import * as firebaseApp from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

export type FirebaseConfig = {
    apiKey?: string
    authDomain?: string
    databaseURL?: string
    projectId?: string
    storageBucket?: string
    messagingSenderId?: string
    appId?: string
}
// ターゲットが増えた場合は、| で繋げて増やす。
type CustomerTarget = 'beauticians'

export default class FirebaseClient {
    public store: firebaseApp.firestore.Firestore
    public auth: firebaseApp.auth.Auth
    public collections: firebaseApp.firestore.CollectionReference<
        firebaseApp.firestore.DocumentData
    >
    public storageRef: firebaseApp.storage.Reference
    private firebase: firebaseApp.app.App

    constructor(config: FirebaseConfig, target: CustomerTarget) {
        this.firebase = firebaseApp.initializeApp(config, target)

        this.store = this.firebase.firestore()
        this.auth = this.firebase.auth()
        this.collections = this.store.collection(target)
        this.storageRef = this.firebase.storage().ref()
    }

    signIn(token: string) {
        return this.firebase.auth().signInWithCustomToken(token)
    }
    getServerTimestamp() {
        return firebaseApp.firestore.FieldValue.serverTimestamp()
    }
    timestampNow() {
        return firebaseApp.firestore.Timestamp.now()
    }
}
