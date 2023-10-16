import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';


//**Test 1********************************************/
export function ItemAdd() {
  const [userData, setUserData] = useState<number>(2);
  
  useEffect(() => {
    const val = 4;
    const setVal = () => {
      setUserData(val);
    };
    setVal();
  }, []);
  
  return (
    <View>
      <Text>Text</Text>
      <Text>User Data: {userData}</Text>
    </View>
  );
}

//**Test 2********************************************/
export const addItem = (val:number) => {
  return val*10
}

export function Features(){
  
}