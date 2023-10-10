import { View, Text } from 'react-native'
import React from 'react'
import { t } from 'react-native-tailwindcss';
import NetInfo from '@react-native-community/netinfo';

export default function LogIn() {

  NetInfo.fetch().then(state => {
  console.log('Connection type', state.type);
  console.log('Is connected?', state.isConnected);
  });

  return (
    <View style={[t.flexGrow,t.justifyAround,t.selfStart]}>
      <Text>LogIn</Text>
    </View>
  )
}