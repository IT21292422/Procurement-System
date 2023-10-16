import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { newItemRequestType } from '../../../../config/types';
import { getNewItemRequest } from '../hooks/newItemRequestHooks';

export default function NewItemRequest() {
	const newItemRequestId = 'dQSwt0Dsx385ttRj5qad';

	const [newRequest, setNewRequest] = useState<newItemRequestType>({
		itemName: '',
		description: '',
		isApproved:  false
	});

	useEffect(() => {
		const fetchNewRequest = async () => {
			const details = await getNewItemRequest(newItemRequestId);
			setNewRequest(details);
		};
		fetchNewRequest();
	}, []);


  return (
    <View>
      <Text>NewItemRequest</Text>
    </View>
  )
}           