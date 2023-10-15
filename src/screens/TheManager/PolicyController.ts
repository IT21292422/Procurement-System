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

async function getPolicyById(docId:any){
    try{
        const docRef = doc(fireStore,"policy",docId.id);
        const querySnapshot = await getDoc(docRef);
        if(querySnapshot.exists()){
            return querySnapshot.data()
        }else{
            console.log("No such policy document")
        }
    }catch(error){
        console.log("Error getting policy by id",error)
    }
}

async function updatePolicy(docId:any, data:Policy){
    try{
        console.log(docId.id)
        console.log(data)
        const docRef = doc(fireStore,"policy",docId.id)
        setDoc(docRef,{policyName: data.policyName, policyAmount: data.policyAmount, description: data.description}, {merge: true})
    
        const updateTimestamp = await updateDoc(docRef,{
            timestamp: serverTimestamp(),
        })
        console.log("Policy Updated Successfully with ID: ",docId.id)
    }catch(error){
        console.log("Error Updating Policy: ",error)
    }
}

async function deletePolicy(id:any){
    try{
        console.log(id)
        await deleteDoc(doc(fireStore,"policy", id));
        console.log("Policy deleted successfully with ID: ", id)
    }catch(error){
        console.log("Error deleting Policy: ",error)
    }
}

export {addPolicy, getPolicies, getPolicyById, updatePolicy, deletePolicy}