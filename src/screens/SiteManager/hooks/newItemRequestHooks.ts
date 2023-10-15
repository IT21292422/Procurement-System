import { doc, addDoc, collection, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore"; 
import { newItemRequestType } from "../../../../config/types";
import { fireStore } from "../../../../config/firebase";


// create a new item request
export async function createNewItemRequest(itemName: string, description: string) {
	try {
		await addDoc(collection(fireStore, 'newItemRequests'), {
			itemName: itemName,
			description: description,
			isApproved:  false
			});	
	} catch (error) {
		console.log('error creating new item request: ', error);
	}
}


// get a list of new item requests with approval status
export async function getNewItemRequestList(): Promise<{ itemName: string; isApproved: boolean; }[]> {
	try {
    const querySnapshot = await getDocs(collection(fireStore, 'newItemRequests'));
    const requestList = querySnapshot.docs.map((doc) => {
			return {
        itemName: doc.data().itemName,
        isApproved: doc.data().isApproved,
      };
    });
		// return type Array<{itemName: string, isApproved: boolean}>
    return requestList;
  } catch (error) {
		console.error("Error fetching item list:", error);
    return [];
  }
}


// get all details of a new item request
export async function getNewItemRequest(id: string): Promise<newItemRequestType> {
	try {
		const docSnap = await getDoc(doc(fireStore, 'newItemRequests', id));

		if (docSnap.exists()) {
			return docSnap.data() as newItemRequestType;
		} else {
			console.log('No such document!');
			return(Promise.reject());
		}
	} catch (error) {
		console.error("Error fetching item list:", error);
		return Promise.reject(error);
	}
}


// update an item request (available only if unapproved)
export async function updateNewItemRequest(id: string, description: string) {
	try {
		await updateDoc(doc(fireStore, 'newItemRequests', id), {
			description: description
		});
	} catch(error) {
		console.log('error while updating document: ', error);
	}
}


// delete an unapproved item request
export async function deleteNewItemRequest(id: string) {
	try {
		await deleteDoc(doc(fireStore, 'newItemRequests', id));	
	} catch (error) {
		console.log('error deleting: ', error)
	}
}