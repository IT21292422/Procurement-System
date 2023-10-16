import { FlatList, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Surface, Text, SegmentedButtons, Avatar, Card, Button, Divider, FAB, Appbar } from 'react-native-paper';
import { StyleSheet, SafeAreaView } from 'react-native';
import { doc } from 'firebase/firestore';
import { fireStore } from '../../../config/firebase';
import { requestNewItemSupplier, getAllItems } from '../../../utils/dbFunctions';
import { itemInterface } from '../../../config/interfaces';
import { ItemUpdateForm } from './ItemUpdateForm';

export default function SupplierProfile()
{
  const [value, setValue] = useState('');
  const [showItems, setShowItems] = useState(false)
  const [showRequests, setShowRequests] = useState(true)
  const [supplierItems, setSupplierItems] = useState<itemInterface[]>([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false)


  // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

  useEffect(() =>
  {

    const loadData = async () =>
    {
      try
      {
        const itemsSnapshot: any = await getAllItems();
        const itemsArray: itemInterface[] = [];
        itemsSnapshot.forEach((doc: any) =>
        {
          itemsArray.push({ id: doc.id, ...doc.data() });
        });

        setSupplierItems(itemsArray);
      } catch (error)
      {
        console.log('Error occurred loading data', error);
      }

    }
    loadData()
    console.log(supplierItems);
  }, [])


  const handleItemPress = () =>
  {

  }

  const handleFabPress = () =>
  {
    setShowUpdateForm(true);
    // if (showItems) {
    //   setShowItems(false);
    // }else{
    //   setShowItems(true);
    // }
    console.log('FAB Pressed');
  }

  const handleUpdateCancel = () =>
  {
    setShowUpdateForm(false);
  }

  const docRef = doc(fireStore, "items", "SF");


  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { }} />
        <Appbar.Content title="Test Supplier" />
        <Appbar.Action icon="menu" onPress={() => { }} />
        <Appbar.Action icon="account" onPress={() => { }} />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'orderClicked',
              label: 'Item requests',
              onPress: () =>
              {
                setShowRequests(true)
                setShowItems(false)
              },
            },
            {
              value: 'itemClicked',
              label: 'Items',
              onPress: () =>
              {
                setShowItems(true)
                setShowRequests(false)
                console.log(supplierItems)
              },
            }
          ]}
        />
      </SafeAreaView>
      <Divider />
      {showItems && supplierItems.length == 0 &&
        <Button loading={true}>Loading Items</Button>}
      {showItems && showUpdateForm && <ItemUpdateForm cancelUpdate={handleUpdateCancel} />}
      {showItems && supplierItems &&
        <FlatList
          data={supplierItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card onPress={handleItemPress} style={styles.container}>
              {/* <Card.Title title={item.itemName} subtitle="Card Subtitle" /> */}
              <Card.Content>
                <Text variant="titleLarge">{item.itemName}</Text>
                <Text variant="bodyMedium">Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam</Text>
              </Card.Content>
              <Card.Cover style={styles.imageHolder} source={require('../../../public/bricks.jpg')} />
              <Card.Actions>
                <Button>Delete</Button>
                <Button>Update</Button>
              </Card.Actions>
            </Card>
          )}
        />}
      {showItems && !showUpdateForm && <FAB
        icon="plus"
        style={styles.fab}
        onPress={handleFabPress}
      />}
      <Surface elevation={1}>
        <Text>Surface</Text>
      </Surface>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 1,
  },
  imageHolder: {
    marginHorizontal: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});