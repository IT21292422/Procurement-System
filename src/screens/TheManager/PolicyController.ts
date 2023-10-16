import { collection, addDoc, serverTimestamp, doc, updateDoc, getDocs, query, orderBy, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import {fireStore} from '../../../config/firebase'

import { Policy } from '../../../config/interfaces'

//This function is used to create a new policy and the data is passed as a parameter 
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

//This function retrieves all the policies from the database
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

//This function retieves the policy based on the id passed as parameter
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

//This function is used to update the policy based on the id
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

//This function deletes the policy based on the id passed
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