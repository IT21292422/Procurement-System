import { collection, doc, getDocs } from "firebase/firestore";
import { fireStore } from "../../../../config/firebase";
import { supplier } from "../../../../config/types";

export async function getSupplierList() {
	const querySnapshot = await getDocs(collection(fireStore, 'suppliers'));
	const supplierList: supplier[] = [];
	if (!querySnapshot.empty) {
		querySnapshot.forEach(doc => {
			supplierList.push({supplierId: doc.id, supplierName: doc.data().supplierName})
		})
  } else {
    console.log('No suppliers exist');
  }
	return supplierList;
}