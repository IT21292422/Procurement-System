import { getAuth, signOut } from "firebase/auth";
import { logOut,setLoading } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';

export function logout() {
    const dispatch = useDispatch()
    const auth = getAuth();
    
    signOut(auth).then(() => {
        dispatch(setLoading(true))
        dispatch(logOut())
        dispatch(setLoading(false))
    }).catch((error) => {
        console.log(error);
    });
}