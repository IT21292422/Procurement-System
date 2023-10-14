import { fireStore } from "../../config/firebase";
import { collection, getDocs, query,where } from "firebase/firestore";

const getAllItems= async (orderId: any) => {
  const items:any = [];
  const q = query(
    collection(fireStore, "items"),
    where("orderId", "==", orderId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    items.push(doc.data());
  });
  console.log(items);
  return items;
}

export default getAllItems;
