import { fireStore } from "../../config/firebase";
import { Items } from "../../config/interfaces";
import {
  collection,
  query,
  where,
  updateDoc,
  getDocs,
} from "firebase/firestore";

const createItem = async (orderId: string, newItem: Items) => {

  console.log(orderId);
  console.log(newItem.itemName);
  try {
  const ordersCollection = collection(fireStore, "orders");
  const q = query(ordersCollection, where("orderId", "==", orderId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const orderDoc = querySnapshot.docs[0]; // Assuming there is only one matching document

    // Get the current itemList from Firestore
    const currentItemList = orderDoc.data().itemList;

    // Add the newItem to the current itemList
    currentItemList.push(newItem);

    // Update the document with the new itemList
    await updateDoc(orderDoc.ref, { itemList: currentItemList });
  } else {
    console.error(`Order with orderId ${orderId} not found.`);
    throw new Error(`Order with orderId ${orderId} not found.`);
  }
} catch (error) {
  console.error("Error adding item to the order:", error);
  throw error;
}
};

export default createItem;