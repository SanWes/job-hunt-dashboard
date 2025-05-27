import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const jobsCollectionRef = collection(db, "jobs");

export const getJobs = async () => {
    const data = await getDocs(jobsCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const addJob = async (job) => {
    const newJobRef = await addDoc(jobsCollectionRef, job);
    return newJobRef.id;
};

export const updateJob = async (id, updatedJob) => {
    const jobDoc = doc(db, "jobs", id);
    await updateDoc(jobDoc, updatedJob);
};

export const deleteJob = async (id) => {
    const jobDoc = doc(db, "jobs", id);
    await deleteDoc(jobDoc);
};
