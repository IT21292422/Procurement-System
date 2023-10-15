import React from 'react'
import { auth, fireStore, storage } from '../config/firebase'
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore'
 import {newItem} from '../config/interfaces'

const itemsColRef = collection(fireStore, 'items');
const ordersColRef = collection(fireStore, 'orders')

export const getAllItems = async () => {
  return await getDocs(itemsColRef);
}

export const requestNewItemSupplier = async (item: newItem) => {
  const addItem = await addDoc(itemsColRef, {...item});

  const docId = addItem.id;
  console.log(`New item added: ${docId}`);
}

export const getAllOrders = async () => {
  return await getDocs(ordersColRef);
}

