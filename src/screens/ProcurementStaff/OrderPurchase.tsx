import { View, Text,Button } from 'react-native'
import React from 'react'
import { setUserType,logOut,logUser,setLoading } from '../../../features/user/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { UserState } from '../../../config/interfaces';

export default function OrderPurchase() {
  const dispatch = useDispatch()
  return (
    <View>
      <Text>OrderPurchase</Text>
    </View>
  )
}