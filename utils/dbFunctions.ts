import React from 'react'
import { auth, fireStore, storage } from '../config/firebase'
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore'

const itemsColRef = collection(fireStore, 'items');

export const getAllItems = async () => {
  return await getDocs(itemsColRef);
}

export const addItem = async () => {
  const addItem = await addDoc(itemsColRef, {itemName: 'abcd', description: 'dshcbhsdk sdjc sdj skjdcjksd j', amount: 45});

  const docId = addItem.id;
  console.log(docId);
  
}
