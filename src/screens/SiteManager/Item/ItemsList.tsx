import { View, ScrollView } from 'react-native';
import { Modal, Text, Card, Title, Button } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { getItemList } from '../hooks/itemHooks';
import ItemDetails from './ItemDetails';
import { logOut } from '../../../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../../../../config/interfaces';

export default function ItemsList() {
	const [itemList, setItemList] = useState<{itemId: string, itemName: string}[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState('');

	const dispatch = useDispatch()
  let userName: string | null = useSelector((state: { user: UserState }) => state.user.userName);

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
			<Text>{`\n`}</Text>
			<Button onPress={() => dispatch(logOut())}>
				Logout
			</Button>
			<Text>{`\n`}</Text>

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