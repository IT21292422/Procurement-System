import { collection, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import {fireStore} from '../../../config/firebase'

import { Policy } from '../../../config/interfaces'

async function addPolicy(data:Policy){

    try{
        const docRef = await addDoc(collection(fireStore, "policy"), data)

        const updateTimestamp = await updateDoc(docRef, {
            id:docRef.id,
            timestamp: serverTimestamp(),
            updatedDate: new Date().toDateString(),
            updatedTime: new Date().toLocaleTimeString(),
        });

        console.log("Policy Added Successfully with ID: ", docRef.id)
    }catch(error){
        console.log("Error Adding Policy Document: ",error)
    }

}

export {addPolicy}