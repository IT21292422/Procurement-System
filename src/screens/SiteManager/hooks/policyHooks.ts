import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStore } from "../../../../config/firebase";


export async function getPolicyNameForItem(itemName: string): Promise<string> {
	const q = query(collection(fireStore, 'items'), where('itemName', '==', `${itemName}`));

	try {
		const querySnapshot = await getDocs(q);
	
		if (querySnapshot.docs.length > 0) {
			const firstDocument = querySnapshot.docs[0];
			return firstDocument.data().policyName;
		} else {
			console.log('No documents found.');
			return '';
		}
	} catch (error) {
		console.error('Error getting documents: ', error);
		return '';
	}
}

export async function getPolicyAmount(policyName: string): Promise<number> {
	const q = query(collection(fireStore, 'policy'), where('policyName', '==', `${policyName}`));
	
	try {
		const querySnapshot = await getDocs(q);
	
		if (querySnapshot.docs.length > 0) {
			const firstDocument = querySnapshot.docs[0];
			return firstDocument.data().policyAmount;
		} else {
			console.log('No documents found.');
			return Infinity;
		}
	} catch (error) {
		console.error('Error getting documents: ', error);
		return Infinity;
	}
}