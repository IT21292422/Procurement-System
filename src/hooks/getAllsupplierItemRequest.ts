import { fireStore } from "../../config/firebase";
import { collection, getDocs, query, } from "firebase/firestore";

const getAllsupplierItemRequest = async () => {

const orders:any = [];
const q = query(collection(fireStore, "supplierItemRequest"))
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  orders.push(doc.data())
});
return orders
}

export default getAllsupplierItemRequest