import React from "react";
import { fireStore, storage } from "../config/firebase";
import {
  QuerySnapshot,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  Timestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { newItem, orderInterface,existingItem } from "../config/interfaces";

const requestItemsColRef = collection(fireStore, "supplierItemRequest");
const itemsColRef = collection(fireStore, "items");
const ordersColRef = collection(fireStore, "orders");

export const getAllItems = async () => {
  return await getDocs(itemsColRef);
};

export const getAllItemRequests = async () => {
  return await getDocs(requestItemsColRef);
};

export const requestNewItemSupplier = async (item: newItem) => {
  try {
    const addItem = await addDoc(requestItemsColRef, { ...item });
    const docId = addItem.id;
    console.log(`New item added: ${docId}`);
    return true;
  } catch (error) {
    console.log("Error occurreed when adding the item", error);
    return false;
  }
};

export const getAllOrders = async () => {
  const q = query(
    ordersColRef,
    where("status", "in", ["delivery_pending", "approved"])
  );

  return await getDocs(q);
};

export const getCompletedOrders = async () => {
  const q = query(ordersColRef, where("status", "==", "delivered"));
  return await getDocs(q);
};

export const getItemById = async (id: string | undefined):Promise<existingItem | boolean> => {
  try {
    const docRef = doc(itemsColRef, id);
    const docSnap:any = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return false;
    }
  } catch (error) {
    return false
    console.log("Error retrieving data on item");

  }
};

export const deleteItem = async (docId: string) => {
  try {
    const docRef = doc(itemsColRef, docId);
    await deleteDoc(docRef);
    console.log(`Item deleted successfully`);
    return true;
  } catch (error) {
    console.log(`Error when deleting item ${error}`);
    return false;
  }
};

export const deleteItemRequest = async (docId: string) => {
  try {
    const docRef = doc(requestItemsColRef, docId);
    await deleteDoc(docRef);
    console.log(`Request deleted successfully`);
    return true;
  } catch (error) {
    console.log(`Error when deleting request ${error}`);
    return false;
  }
};

export const formatDate = (timestamp: any) => {
  const date: Date = timestamp.toDate();
  const newDate = Timestamp.fromDate(new Date());
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const result = newDate.toDate().toDateString();
  return result;
  // return newDate.toLocaleString();
};

export const dateToString = (time: any) => {
  console.log(time);
  console.log(typeof time);
  const date = time.toDate();
  return `${date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

export const updateDeliveryDate = async () => {
  
};

export const rejectOrder = async (id: string) => {
  try {
    const docRef = doc(ordersColRef, id);
    const result = await updateDoc(docRef, { status: "rejected" });
    return true;
  } catch (error) {
    console.log(`Error when rejecting request ${error}`);
    return false;
  }
};


export const updateItem = async (id: string, data: existingItem) =>{
  try {
    const docRef = doc(itemsColRef, id);
    const result = await updateDoc(docRef, {...data});
    return true;
  } catch (error) {
    console.log(`Error when updating order ${error}`);
    return false;
  }
}
