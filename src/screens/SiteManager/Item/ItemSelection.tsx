// for the draft

import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getItemDetails } from '../hooks/itemHooks';
import { ItemType } from '../../../../config/types';

export default function ItemSelection() {
	const [itemDetails, setItemDetails] = useState<ItemType>({
		itemId: "",
		itemName: "",
		description: "",
		unitPrice: 0,
		policy: "",
		unit: ""
	});
	
	useEffect(() => {
		const fetchItemDetails = async () => {
			const details = await getItemDetails('OPC 53 Grade cement');
			setItemDetails(details);
		};
		fetchItemDetails();
	}, []);


  return (
    <View>
      <Text>ItemSelection</Text>
    </View>
  )
}       