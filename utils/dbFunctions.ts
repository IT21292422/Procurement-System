import React from 'react'
import { auth, fireStore, storage } from '../config/firebase'
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore'
 import {newItem} from '../config/interfaces'

const requestItemsColRef = collection(fireStore, 'supplierItemRequest');
const itemsColRef = collection(fireStore, 'items');
const ordersColRef = collection(fireStore, 'orders')

export const getAllItems = async () => {
  return await getDocs(itemsColRef);
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

