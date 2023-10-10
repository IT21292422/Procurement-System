import { View, Text } from 'react-native'
import React from 'react'
import { t } from 'react-native-tailwindcss';

export default function LogIn() {
  return (
    <View style={[t.flexGrow,t.justifyAround,t.selfStart]}>
      <Text>LogIn</Text>
    </View>
  )
}