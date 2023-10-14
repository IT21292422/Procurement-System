import { useState } from 'react';
import { getAuth, UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { fireStore } from '../../config/firebase';
import { LoginResponse } from '../../config/interfaces';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';

export default async function login(email: string, password: string): Promise<LoginResponse> {
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  const auth = getAuth();
  // const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    
  //   if(userCredential){
  //     // Query the FireStore collection to find the user
  //     const usersRef = collection(fireStore, "users");
  //     const q = query(usersRef, where("userEmail", "==", email));
  //     const querySnapshot = await getDocs(q);
      
  //     if (!querySnapshot.empty) {
  //       // Assuming there's only one user document with the given email
  //       const userData = querySnapshot.docs[0].data() as DocumentData;
  //       const retrievedUserType = userData.userType;
  //       setUserType(retrievedUserType);
  //     } else {
  //       setError("User not found in FireStore.");
  //     }
  //     setError(null); // Reset error in case it was previously set
  //   }else{
  //     setError('something is wrong')
  //   }    
  //   // Return an object containing user type and error states
    setError(null)
    setUserType('procurement_staff')

      const userData = {
    userEmail: "procurement_staff@email.com",
    password: "12345678",
    userType: "procurement_staff",
  };
  signInWithEmailAndPassword(auth, userData.userEmail, userData.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
  });

    return { userType, error };
  }
  
