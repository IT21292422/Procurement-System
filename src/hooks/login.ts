import { useState } from 'react';
import { getAuth, UserCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { fireStore } from '../../config/firebase';
import { LoginResponse } from '../../config/interfaces';
import { collection, where, query, getDocs } from 'firebase/firestore';

export default async function login(email: string, password: string): Promise<LoginResponse> {
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  const auth = getAuth();

  const userData = {
    userEmail: "procurement_staff@email.com",
    password: "12345678",
    userType: "procurement_staff",
  };
  const userCredential: UserCredential = await signInWithEmailAndPassword(auth, userData.userEmail, userData.password);
  if (userCredential) {
    const usersRef = query(collection(fireStore, "users"),where("userEmail","==",userData.userEmail));
    const getUserType = await getDocs(usersRef)

    if (getUserType.docs.length > 0) {
      const userTypeData:any = getUserType.docs[0].data();
      // Now, you can set the user type or do something with it
      console.log(userTypeData);
      setUserType(userTypeData);
      setError(null)
      return { userType, error };
    } else {
      // Handle the case where no user with the given email was found
      setUserType(null);
      setError('Error on auth selecting user')
      return { userType, error };
    }
  }
}




//***loging phase*****************************/
// const auth = getAuth();
// const userCredential:UserCredential = await createUserWithEmailAndPassword(auth,email,password)
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
  //   setError(null)
