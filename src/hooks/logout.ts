import { signOut } from "firebase/auth";
import { auth } from '../../config/firebase';
import { logOut,setLoading } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';

export default function logout() {
    const dispatch = useDispatch()

    signOut(auth).then(() => {
        dispatch(setLoading(true))
        dispatch(logOut())
        dispatch(setLoading(false))
    }).catch((error) => {
        console.log(error);
    });
}