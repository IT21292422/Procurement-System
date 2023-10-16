import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { fireStore } from '../../../../config/firebase';
import { ItemType } from '../../../../config/types';
import { getItemDetails } from '../hooks/itemHooks';
import { Text, Card, Title, Paragraph, Button, IconButton, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { addItemToDraftItemList, createNewDraft, existingDraft, getExistingDraftId } from '../hooks/draftHools';


interface ItemDetailsProps {itemId: string};


export default function ItemDetails(props: ItemDetailsProps) {
	const { itemId } = props;
	const [itemDetails, setItemDetails] = useState<ItemType | null>(null);
	const [units, setUnits] = useState('1');
	const [isAddToDraftDisabled, setIsAddToDraftDisabled] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	// const [showOrderSection, setShowOrderSection] = useState(false);
	
	useEffect(() => {
		const fetchItemDetails = async () => {
			const details = await getItemDetails(itemId);
			setItemDetails(details);
		};
		fetchItemDetails();
		console.log(fetchItemDetails())
	}, []);

	const handleIncreaseUnits = () => {
		setUnits((prevUnits) => (parseInt(prevUnits) + 1).toString());
	};

	const handleDecreaseUnits = () => {
		if (parseInt(units) > 1) {
			setUnits((prevUnits) => (parseInt(prevUnits) - 1).toString());
		}
	};

	const handleUnitChange = (text: string) => {
		if (/^\d*$/.test(text)) {
			setUnits(text);
		}
	};

	const handleAddToDraft = async () => {
		setIsAddToDraftDisabled(true);
		if (!(await existingDraft())) { await createNewDraft() };
		const draftId = await getExistingDraftId();
		const newItem = { 
			itemName: itemDetails?.itemName|| '', 
			unitPrice: itemDetails?.unitPrice || 0, 
			quantity: parseInt(units) || 0
		}

		try {
			await addItemToDraftItemList((draftId || ''), newItem);
			setSuccess(true);
			setIsAddToDraftDisabled(false);
		} catch (error) {
			console.log('error with addItemToDraftItemList(): ', error);
			setError(true);
			setSuccess(false);
			return;
		}
	};


	return (
		<Card>
			<Card.Content>
				{isAddToDraftDisabled ? (
					<Text>Adding to Draft...</Text>
				) : success ? (
					// Success card content
					<>
						<Title>Success</Title>
						<Text>Item added to draft</Text>
					</>
				) : error ? (
					// Error card content
					<>
						<Title>Error</Title>
						<Text>Error adding item to draft</Text>
					</>
				) : (
					// Default card content
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						<Title>{itemDetails?.itemName}</Title>
						<Text>{`Price: RS:${itemDetails?.unitPrice} per ${itemDetails?.unit}\n`}</Text>
						<Text>{`\ndescription:`}</Text>
						<Paragraph>{`${itemDetails?.description}\n`}</Paragraph>
	
						{/* for building order/draft */}
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<IconButton icon="minus" size={20} onPress={handleDecreaseUnits} />
							<TextInput
								label="Units"
								value={units}
								onChangeText={handleUnitChange}
								keyboardType="numeric"
								style={{ width: 100 }}
							/>
							<IconButton icon="plus" size={20} onPress={handleIncreaseUnits} />
							<Text>{`   x${itemDetails?.unit}(s)`}</Text>
						</View>
	
						<Text style={{ fontWeight: 'bold' }}>{`\nTotal: RS: ${(itemDetails?.unitPrice || 0) * parseInt(units)}\n`}</Text>
						
						<Button
						mode="contained"
						onPress={handleAddToDraft}
						disabled={isAddToDraftDisabled} >
							Add to Draft
						</Button>
					</ScrollView>
				)}
			</Card.Content>
		</Card>
	);
}