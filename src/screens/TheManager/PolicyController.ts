import { collection, addDoc, serverTimestamp, doc, updateDoc, getDocs, query, orderBy, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import {fireStore} from '../../../config/firebase'

import { Policy } from '../../../config/interfaces'

async function addPolicy(data:Policy){

    try{
        const docRef = await addDoc(collection(fireStore, "policy"), data)

        const updateTimestamp = await updateDoc(docRef, {
            id:docRef.id,
            timestamp: serverTimestamp(),
        });

        console.log("Policy Added Successfully with ID: ", docRef.id)
    }catch(error){
        console.log("Error Adding Policy Document: ",error)
    }

}

async function getPolicies(){
    const policies:any = [];
    try{
        const q = query(collection(fireStore,"policy"),orderBy("timestamp"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            policies.push(doc.data())
        });
        return policies
    }catch(error){
        console.log("Error Retrieving All Policy Document: ",error)
    }
}

async function getPolicyById(id:any){
    try{
        const docRef = doc(fireStore,"policy",id);
        const querySnapshot = await getDoc(docRef);
        if(querySnapshot.exists()){
            return querySnapshot.data()
        }else{
            console.log("No such policy document")
        }
    }catch(error){
        console.log("Error Retrieving Policy Document: ",error)
    }

}

async function updatePolicy(id:any, data:Policy){
    try{
        const docRef = doc(fireStore,"policy",id)
        setDoc(docRef,{policyName: data.policyName, amount: data.policyAmount, description: data.description}, {merge: true})
    
        const updateTimestamp = await updateDoc(docRef,{
            timestamp: serverTimestamp(),
            updatedDate: new Date().toDateString(),
            updatedTime: new Date().toLocaleTimeString
        })
        console.log("Policy Updated Successfully with ID: ",id)
    }catch(error){
        console.log("Error Updating Policy: ",error)
    }
}

async function deletePolicy(id:any){
    try{
        await deleteDoc(doc(fireStore,"policy", id));
        console.log("Policy deleted successfully with ID: ", id)
    }catch(error){
        console.log("Error deleting Policy: ",error)
    }
}

export {addPolicy, getPolicies, getPolicyById, updatePolicy, deletePolicy}