import * as admin from 'firebase-admin'
import serviceJson from "./comp2523-term-project-firebase-adminsdk-ej2ur-a2a6938ddc.json"

admin.initializeApp({
    credential: admin.credential.cert(serviceJson),
    databaseURL: "https://comp2523-term-project-default-rtdb.firebaseio.com/"
})

export default admin