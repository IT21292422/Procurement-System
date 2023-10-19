import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "../../../../config/firebase";

export async function getSiteList() {
	const querySnapshot = await getDocs(collection(fireStore, 'sites'));
	const siteList: string[] = [];
	if (!querySnapshot.empty) {
		querySnapshot.forEach(doc => {
			siteList.push(doc.data().siteName);
		})
  } else {
    console.log('No suppliers exist');
  }
	return siteList;
}