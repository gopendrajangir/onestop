import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebaseAuth";

export default async (phone: string, buttonId: string) => {
  const recaptchaVerifier = new RecaptchaVerifier(
    buttonId,
    {
      size: 'invisible',
      callback: () => { },
    },
    auth
  );
  const confirmationResult = await signInWithPhoneNumber(
    auth,
    phone,
    recaptchaVerifier
  );

  return confirmationResult;
};