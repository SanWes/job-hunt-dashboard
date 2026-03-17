import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export const createUserDocument = async (uid, userData) => {
  if (!uid) throw new Error('User ID is required');
  
  const userDocRef = doc(db, "users", uid);
  const userDocument = {
    ...userData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  
  await setDoc(userDocRef, userDocument);
  return userDocument;
};
