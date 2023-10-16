import { fireStore } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Items } from "../../config/interfaces";

const getAllItems = async (orderId: string) => {
  const items:Items[] = [];

  try {
    const ordersCollection = collection(fireStore, "order");
    const q = query(ordersCollection, where("orderId", "==", orderId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const itemList = doc.data().itemList;
      items.push(...itemList);
    });

    if (items.length === 0) {
      console.log(`No items found for order with orderId ${orderId}.`);
    }
  } catch (error) {
    console.error("Error fetching items:", error);
  }

  console.log(items);
  return items;
}

export default getAllItems;
