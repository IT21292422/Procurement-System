import { View, Text,Button } from 'react-native'
import React from 'react'
import { setUserType,logOut,logUser,setLoading } from '../../../features/user/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { UserState } from '../../../config/interfaces';

export default function ItemAdd() {
  const dispatch = useDispatch()
  let userName: string | null = useSelector((state: { user: UserState }) => state.user.userName);
  return (
    <View>
      <Text>OrderView for {userName}</Text>
      <Text>ItemAdd</Text>
    </View>
  )
}