import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { fireStore } from "../../../../config/firebase";
import { ItemType } from "../../../../config/types";


// get all item fields
export async function getItemDetails(itemId: string): Promise<ItemType> {
	try {
		const docRef = doc(fireStore, 'items', itemId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const data = docSnap.data() as ItemType;
			return { ...data, itemId: docSnap.id };
		} else {
			console.log("No such document!");
			return {
				itemId: "",
				itemName: "",
				description: "",
				unitPrice: 0,
				policy: ""
			};
		}
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
}


// get the names of all items
export async function getItemList() {
	try {
		const itemsCollection = collection(fireStore, "items");
		const querySnapshot = await getDocs(itemsCollection);

		const itemList: string[] = [];

		querySnapshot.forEach((doc) => {
			itemList.push(doc.data().itemName);
		});

		return itemList;
	} catch (error) {
		console.error("Error fetching item list:", error);
		return [];
	}
}