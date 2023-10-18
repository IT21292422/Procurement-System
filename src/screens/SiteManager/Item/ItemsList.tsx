import { View, ScrollView } from 'react-native';
import { Modal, Text, Card, Title, Paragraph, Button } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { getItemList } from '../hooks/itemHooks';
import { useNavigation } from '@react-navigation/native';
import ItemDetails from './ItemDetails';

export default function ItemsList() {
	const [itemList, setItemList] = useState<{itemId: string, itemName: string}[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState('');

	useEffect(() => {
		const fetchItemList = async () => {
			setItemList(await getItemList());
		};
		fetchItemList();
	}, []);

	const toggleModal = (itemId: string) => {
		setSelectedItemId(itemId);
		setIsModalVisible(!isModalVisible);
	};
	console.log(selectedItemId)


	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			{itemList.map((item) => (
				<Card key={item.itemId} onPress={() => toggleModal(item.itemId)}>
					<Card.Content>
						<Title>{item.itemName}</Title>
					</Card.Content>
				</Card>
			))}

    <Modal
      visible={isModalVisible}
      onDismiss={() => setIsModalVisible(false)}
			contentContainerStyle={{ flex: 1, justifyContent: 'flex-start', marginTop: 56, marginHorizontal: 10 }} >
      <Card>
        <Card.Content>
					<ItemDetails itemId={selectedItemId} /> 
					<Text>{'\n'}</Text>
          <Button onPress={() => setIsModalVisible(false)}>Close</Button>
        </Card.Content>
      </Card>
    </Modal>
  </ScrollView>
	)
};