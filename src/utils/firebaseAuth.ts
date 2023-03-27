import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

import { firebaseConfig } from "../../firebase.config";

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export const auth = getAuth(firebaseApp);
