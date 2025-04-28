import { db, collection, addDoc, query, where, getDocs, updateDoc, doc, deleteDoc } from './firebase';

export const getEntries = async (userId) => {
  const q = query(collection(db, "entries"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addEntry = async (content, userId) => {
  const docRef = await addDoc(collection(db, "entries"), {
    content,
    userId,
    createdAt: new Date().toISOString()
  });
  return { id: docRef.id, content, userId };
};

export const updateEntry = async (id, newContent) => {
  await updateDoc(doc(db, "entries", id), { content: newContent });
};

export const deleteEntry = async (id) => {
  await deleteDoc(doc(db, "entries", id));
};