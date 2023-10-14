import { fireStore } from "../../config/firebase";
import { Items } from "../../config/interfaces";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const createItem = async (orderId: string, newItem: Items) => {

  console.log(orderId);
  console.log(newItem.itemName);
  // try {
  //   const ordersCollection = collection(fireStore, "orders");
  //   const q = query(ordersCollection, where("orderId", "==", orderId));
  //   const querySnapshot = await getDoc(q);

  //   if (querySnapshot.exists()) {
  //     const orderRef = doc(fireStore, "orders", querySnapshot.id);

  //     // Update the itemList by adding the newItem to it using arrayUnion
  //     const updatedData = {
  //       itemList: arrayUnion(newItem),
  //     };

  //     // Update the document with the new item
  //     await updateDoc(orderRef, updatedData);
  //   } else {
  //     console.error(`Order with orderId ${orderId} not found.`);
  //     throw new Error(`Order with orderId ${orderId} not found.`);
  //   }
  // } catch (error) {
  //   console.error("Error adding item to the order:", error);
  //   throw error; // You can choose to throw the error for further handling or handle it here
  // }
};

export default createItem;