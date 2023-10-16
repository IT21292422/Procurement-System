import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getNewItemRequestList } from '../hooks/newItemRequestHooks';

export default function NewItemRequests() {
  const [requestList, setRequestList] = useState<{ itemName: string; isApproved: boolean; }[]>([]);

  useEffect(() => {
    const fetchNewItemRequests = async () => {
      setRequestList(await getNewItemRequestList());
    };
    fetchNewItemRequests();
  }, []);


  return (
    <View>
      <Text>NewItemRequests</Text>
    </View>
  )
}           