import { fireStore } from "../../config/firebase";
import {
  doc,
  collection,
  updateDoc,
} from "firebase/firestore";

// Function to update the status of an order
const updateOrderStatus = async (orderId:string, newStatus:string) => {
  const orderRef = doc(fireStore, "orders", orderId);

  try {
    await updateDoc(orderRef, {
      status: newStatus,
    });
    console.log(`Order ${orderId} status updated to ${newStatus}`);
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};

export default updateOrderStatus;
