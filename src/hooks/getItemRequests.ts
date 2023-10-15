import { fireStore } from '../../config/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { IRequestedItems } from '../../config/interfaces';

const getItemRequests = async () =>{
  const requestedItems:IRequestedItems[] = [];

  const q = query(collection(fireStore, "newItemRequests"))
  const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    requestedItems.push(doc.data() as IRequestedItems)
  });

  return requestedItems
}
export default getItemRequests;