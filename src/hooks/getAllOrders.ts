import { fireStore } from "../../config/firebase";
import { collection, getDocs, query, } from "firebase/firestore";

const getAllOrders = async () => {

const orders:any = [];
const q = query(collection(fireStore, "order"))
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  orders.push(doc.data())
});
return orders
}

export default getAllOrders