import { View, Text,Button } from 'react-native'
import React from 'react'
import { t } from 'react-native-tailwindcss';
import NetInfo from '@react-native-community/netinfo';
import { UserState } from '../../config/interfaces';
import { useSelector,useDispatch } from 'react-redux';
import { setUserType } from '../../features/user/userSlice';


export default function LogIn() {

  const dispatch = useDispatch()

let userName: string | null = useSelector((state: { user: UserState }) => state.user.userName);
let userType: string | null = useSelector((state: { user: UserState }) => state.user.userType);
let isLoading: boolean = useSelector((state: { user: UserState }) => state.user.isLoading);


  NetInfo.fetch().then(state => {
  console.log('Connection type', state.type);
  console.log('Is connected?', state.isConnected);
  });

    return (
    <View style={[t.flexGrow,t.justifyAround,t.selfStart]}>
      <Text>LogIn</Text>
      <Text>User name {userName}</Text>
      <Text>User type {userType}</Text>
      <Button title='change to manager' onPress={() => dispatch(setUserType('manager'))}/>
      <Button title='change to site_manager' onPress={() => dispatch(setUserType('site_manager'))}/>
      <Button title='change to procurement_staff' onPress={() => dispatch(setUserType('procurement_staff'))}/>
      <Button title='change to supplier' onPress={() => dispatch(setUserType('supplier'))}/>
    </View>
  )
}