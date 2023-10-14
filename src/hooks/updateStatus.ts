import { fireStore } from "../../config/firebase";
import {
  collection,
  query,
  where,
  setDoc,
  DocumentReference,
  getDocs,
} from "firebase/firestore";

// Function to update the status of items in an order
const updateStatus = async (orderId: string, newStatus: string) => {
  const ordersCollection = collection(fireStore, "orders");
  const q = query(ordersCollection, where("orderId", "==", orderId));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.size > 0) {
    // Assuming there's only one matching document, you can access it with `docs[0]`
    const orderDoc = querySnapshot.docs[0];

    // Define the new data to update the document
    const newData = {
      status: newStatus,
    };
    console.log(orderDoc.id);
    // Use setDoc to update the document with the new data
    await setDoc(orderDoc.ref, newData, { merge: true });
    console.log(`Order ${orderId} status updated to ${newStatus}`);
  } else {
    console.error(`Order ${orderId} not found.`);
  }
};

export default updateStatus;


