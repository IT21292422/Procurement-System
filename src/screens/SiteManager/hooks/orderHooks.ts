import { doc, serverTimestamp, addDoc, collection, updateDoc, getDoc } from "firebase/firestore";
import { OrderType } from "../../../../config/types";
import { fireStore } from "../../../../config/firebase";


// create order
export async function createNewOrder(newOder: OrderType) {
	try {
		await addDoc(collection(fireStore, 'orders'), {
			...newOder,
			isDraft: false,
			createdAt: serverTimestamp()
		});
	} catch (error) {
		console.log('error creating new order: ', error);
	}	
}


// get order details
export async function getOrderDetails(orderId: string): Promise<OrderType> {
	try {
		const docSnap = await getDoc(doc(fireStore, 'orders', orderId));
		if (docSnap.exists()) {
			return docSnap.data() as OrderType;
		} else {
			console.log('No such document!');
			return(Promise.reject());
		}
	} catch (error) {
		console.error("Error fetching order details:", error);
		return Promise.reject(error);
	}
}


// confirm order arrival
export async function updateStatusToDelivered(orderId: string) {
	try {
		await updateDoc(doc(fireStore, 'orders', orderId), {
			status: 'delivered'
		});
	} catch(error) {
		console.log('error while updating document: ', error);
	}
}