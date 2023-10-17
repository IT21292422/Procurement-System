import React from 'react'
import { auth, fireStore, storage } from '../config/firebase'
import { QuerySnapshot, DocumentData, addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
 import {newItem, orderInterface} from '../config/interfaces'

const requestItemsColRef = collection(fireStore, 'supplierItemRequest');
const itemsColRef = collection(fireStore, 'items');
const ordersColRef = collection(fireStore, 'orders')


export const getAllItems = async () => {
  return await getDocs(itemsColRef);
}

export const getAllItemRequests = async () => {
  return await getDocs(requestItemsColRef);
}

export const requestNewItemSupplier = async (item: newItem) => {
  try {
    const addItem = await addDoc(requestItemsColRef, {...item});
    const docId = addItem.id;
    console.log(`New item added: ${docId}`);
    return true

  } catch (error) {
    console.log('Error occurreed when adding the item', error);
    return false
  }

}

export const getAllOrders = async () => {
  return await getDocs(ordersColRef);
}

export const getCompletedOrders = async() => {
  const q = query(ordersColRef, where("status", "==", "approved"));
  return await getDocs(q);
}

export const deleteItemRequest = async (docId: string) => {
  try {
    const docRef =  doc(requestItemsColRef, docId)
    await deleteDoc(docRef);
    console.log(`Request deleted successfully`);
    return true;
  } catch (error) {
    console.log(`Error when deleting request ${error}`);
    return false;
  }
}

