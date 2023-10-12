import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { fireStore } from '../../../config/firebase';

type ItemType = {
	itemId: string;
	itemName: string;
	description: string;
	unitPrice: number;
	policy: string;
}

export default function ItemDetails() {
	const itemId = 'cp7RzpuvXMxFUbCmctNM';
	const [itemDetails, setItemDetails] = useState<ItemType>({
		itemId: "",
		itemName: "",
		description: "",
		unitPrice: 0,
		policy: ""
	});

	// read item details
	const getItemDetails = async () => {
		try {
			const docRef = doc(fireStore, 'items', itemId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const data = docSnap.data() as ItemType;
				setItemDetails(data);
			} else {
				console.log("No such document!");
			}
		} catch (error) {
			console.log(error);
		}
	};


	return (
		<View>
			<Text>ItemDetails</Text>
		</View>
	)
}   