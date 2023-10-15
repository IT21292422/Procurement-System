import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { fireStore } from '../../../../config/firebase';
import { ItemType } from '../../../../config/types';
import { getItemDetails } from '../hooks/itemHooks';
import { Text, Card, Title, Paragraph, Button } from 'react-native-paper';
import { ScrollView } from 'react-native';


interface ItemDetailsProps {itemId: string};


export default function ItemDetails(props: ItemDetailsProps) {
	const { itemId } = props;
	const [itemDetails, setItemDetails] = useState<ItemType | null>(null);
	
	useEffect(() => {
		const fetchItemDetails = async () => {
			const details = await getItemDetails(itemId);
			setItemDetails(details);
		};
		fetchItemDetails();
		console.log(fetchItemDetails())
	}, []);


	return (
		<Card>
			<Card.Content>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<Title>{itemDetails?.itemName}</Title>
					<Text>{`Price: RS:${itemDetails?.unitPrice} per ${itemDetails?.unit}\n`}</Text>
					<Text>{`\ndescription:`}</Text>
					<Paragraph>{`${itemDetails?.description}\n`}</Paragraph>
				</ScrollView>
			</Card.Content>
		</Card>
	);
}   