import { fireStore } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const addSystemItem = async (systemItem:any) => {
  try {
    const ordersCollection = collection(fireStore, "items");
    const newOrderRef = await addDoc(ordersCollection, systemItem);
    console.log(newOrderRef);
    return newOrderRef.id; // Return the ID of the newly created order document
  } catch (error) {
    // Handle any errors that may occur during the creation process
    console.error("Error creating order:", error);
    throw error; // You can choose to throw the error for further handling or handle it here
  }
};

export default addSystemItem;