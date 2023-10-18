import { collection, addDoc, serverTimestamp, doc, updateDoc, getDocs, query, orderBy, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import {fireStore} from '../../../config/firebase'

import { OrderType } from '../../../config/types';


//This retrieves all the orders from the database
async function getOrders(){
    const orders:any = [];
    try{
        const q = query(collection(fireStore,"orders"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            orders.push({ id: doc.id, data: doc.data() })
        });
        //console.log(orders)
        return orders
    }catch(error){
        console.log("Error Retrieving All Order Document: ",error)
    }
}

//This retieves only the order passed as the parameter
async function getOrderById(docId:string){
    try{
        const docRef = doc(fireStore,"orders",docId);
        const querySnapshot = await getDoc(docRef);
        if(querySnapshot.exists()){
            return querySnapshot.data()
        }else{
            console.log("No such order document")
        }
    }catch(error){
        console.log("Error getting order by id",error)
    }
}

//This function updates the status of the order to approved
async function updateOrders(docId:string){
    try{
        console.log(docId)
        const docRef = doc(fireStore,"orders",docId)
        setDoc(docRef,{status: "approved"}, {merge: true})
        console.log("Order Status set to Approved: ",docId)
    }catch(error){
        console.log("Error Updating Order Status: ",error)
    }
}

//This function deletes the order declined by the manager
async function deleteOrder(id:any){
    try{
        console.log(id)
        await deleteDoc(doc(fireStore,"orders", id));
        console.log("Order deleted successfully with ID: ", id)
    }catch(error){
        console.log("Error deleting Order: ",error)
    }
}

export {getOrders, updateOrders, getOrderById, deleteOrder}