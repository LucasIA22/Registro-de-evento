import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAtrb6r8GRAmRGRprVmJrimzCZhgHCBfS8",
  authDomain: "folkloric-air-425618-q1.firebaseapp.com",
  projectId: "folkloric-air-425618-q1",
  storageBucket: "folkloric-air-425618-q1.appspot.com",
  messagingSenderId: "437345885838",
  appId: "1:437345885838:web:c614a43b2b896d7c72b3df",
  measurementId: "G-7Y0WG8XMHK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveEvento = async (evento) => {
    try {
        const docRef = await addDoc(collection(db, "eventos"), evento);
        return docRef.id; // Retorna el ID del documento creado
    } catch (error) {
        console.error("Error al guardar el evento:", error);
        throw error;
    }
};

export const getAllEventos = (callback) => {
    return onSnapshot(collection(db, "eventos"), callback);
};

export const deleteEvento = async (id) => {
    try {
        await deleteDoc(doc(db, "eventos", id));
    } catch (error) {
        console.error("Error al eliminar el evento:", error);
        throw error;
    }
};

export const updateEvento = async (id, evento) => {
    try {
        await updateDoc(doc(db, "eventos", id), evento);
    } catch (error) {
        console.error("Error al actualizar el evento:", error);
        throw error;
    }
};

export const getEventoById = async (id) => {
    try {
        const docSnap = await getDoc(doc(db, "eventos", id));
        return docSnap.data();
    } catch (error) {
        console.error("Error al obtener el evento por ID:", error);
        throw error;
    }
};