import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { OrderType } from "../../../../config/types";
import { fireStore } from "../../../../config/firebase";


type itemListElementType = { itemName: string, unitPrice: number, quantity: number }


// check whether any drafts exist
export async function existingDraft() {
	const querySnapshot = await getDocs(collection(fireStore, 'drafts'));
	return !querySnapshot.empty;
}

// get the id of existing draft
export async function getExistingDraftId() {
  const draftsCollection = collection(fireStore, 'drafts');
  const querySnapshot = await getDocs(draftsCollection);

  if (!querySnapshot.empty) {
    const firstDoc = querySnapshot.docs[0];
    return firstDoc.id;
  } else {
    console.log('No drafts exist');
    return null;
  }
}


// create draft
export async function createNewDraft() {
	try {
		await addDoc(collection(fireStore, 'drafts'), {
			isDraft: true,
		});
	} catch (error) {
		console.log('error creating new order: ', error);
	}	
}

// get draft details
export async function getDraftDetails(draftId: string): Promise<OrderType> {
	try {
		const docSnap = await getDoc(doc(fireStore, 'drafts', draftId));
		if (docSnap.exists()) {
			return docSnap.data() as OrderType;
		} else {
			console.log('No such document!');
			return(Promise.reject());
		}
	} catch (error) {
		console.error("Error fetching draft details:", error);
		return Promise.reject(error);
	}
}


// add a new item to itemList
export async function addItemToItemList(draftId: string, newItem: itemListElementType) {
	try {
		const draftRef = doc(fireStore, 'drafts', draftId);
		const docSnapshot = await getDoc(draftRef);

		if (docSnapshot.exists()) {
			const existingData = docSnapshot.data();
			const existingItemList = existingData.itemList || []; 
			// Initialize as an empty array if itemList doesn't exist
			existingItemList.push(newItem);
			await updateDoc(draftRef, { itemList: existingItemList });
		} else {
			console.log('Document does not exist');
		}
	} catch(error) {
		console.log('error adding new item to list', error);
	}
}


// delete item from itemList
export async function deleteItemFromItemList(draftId: string, itemName: string) {
	try {
		const draftRef = doc(fireStore, 'drafts', draftId);
		const docSnapshot = await getDoc(draftRef);

		if (docSnapshot.exists()) {
			const existingItemList = docSnapshot.data().itemList || [];
			const itemIndexToDelete = existingItemList.findIndex(
				(item:itemListElementType) => item.itemName === itemName
			);

			if (itemIndexToDelete !== -1) {
				existingItemList.splice(itemIndexToDelete, 1);
				await updateDoc(draftRef, { itemList: existingItemList });
			} else {
				console.log('Item not found in itemList');
			}
		} else {
			console.log('Document does not exist');
		}
	} catch (error) {
		console.log('Error deleting item from list', error);
	}
}


// delete / cancel draft
export async function deleteDraft(id: string) {
	try {
		await deleteDoc(doc(fireStore, 'drafts', id));	
	} catch (error) {
		console.log('error deleting: ', error)
	}
}
