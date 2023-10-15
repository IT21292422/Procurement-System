import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { fireStore } from '../../../../config/firebase';
import { ItemType } from '../../../../config/types';
import { getItemDetails } from '../hooks/itemHooks';

export default function ItemDetails() {
	
	const [itemDetails, setItemDetails] = useState<ItemType>({
		itemId: "",
		itemName: "",
		description: "",
		unitPrice: 0,
		policy: ""
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
			<Text>ItemDetails</Text>
		</View>
	)
}   