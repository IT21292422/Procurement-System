import { View, Text,Button } from 'react-native'
import React from 'react'
import { setUserType,logOut,logUser,setLoading } from '../../../features/user/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { UserState } from '../../../config/interfaces';

export default function OrderView() {

  const dispatch = useDispatch()
  let userType: string | null = useSelector((state: { user: UserState }) => state.user.userType);
  let userName: string | null = useSelector((state: { user: UserState }) => state.user.userName);

  return (
    <View>
      <Text>OrderView for {userName}</Text>
       <Button title='Logout' onPress={() => {
        dispatch(setUserType(null))
        dispatch(logOut())
      }}/>
    </View>
  )
}