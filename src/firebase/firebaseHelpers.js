import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const getJobs = async (userId) => {
    if (!userId) throw new Error('User ID is required');
    const userJobsCollectionRef = collection(db, "users", userId, "jobs");
    const data = await getDocs(userJobsCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const addJob = async (job, userId) => {
    if (!userId) throw new Error('User ID is required');
    const userJobsCollectionRef = collection(db, "users", userId, "jobs");
    const newJobRef = await addDoc(userJobsCollectionRef, job);
    return newJobRef.id;
};

export const updateJob = async (id, updatedJob, userId) => {
    if (!userId) throw new Error('User ID is required');
    const jobDoc = doc(db, "users", userId, "jobs", id);
    await updateDoc(jobDoc, updatedJob);
};

export const deleteJob = async (id, userId) => {
    if (!userId) throw new Error('User ID is required');
    const jobDoc = doc(db, "users", userId, "jobs", id);
    await deleteDoc(jobDoc);
};
