import { View, Text } from 'react-native'
import React,{useEffect,useState} from 'react'

export default function ItemAdd() {
  const [userData, setUserData] = useState<number>(2);

  useEffect(() => {
    const val = 4;
    const setVal = () => {
      setUserData(val);
    };
    setVal();
  }, []);

  return (
    <View><Text>Text</Text></View>
  );
}