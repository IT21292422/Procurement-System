import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getItemList } from '../hooks/itemHooks';

export default function ItemsList() {
  const [itemList, setItemList] = useState<string[]>([]);

  useEffect(() => {
    const fetchItemList = async () => {
      setItemList(await getItemList());
    };
    fetchItemList();
  }, []);

  return (
    <View>
      <Text>ItemsList</Text>
    </View>
  )
};