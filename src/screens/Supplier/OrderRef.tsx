import { FlatList, Image, View } from 'react-native'
import { getAllItemRequests, deleteItemRequest, getAllItems } from '../../../utils/dbFunctions';

import React, { useEffect, useState } from 'react'
import { Surface, Text, SegmentedButtons, Avatar, Card, Button, Divider, FAB, Appbar, useTheme } from 'react-native-paper';
import { itemInterface } from '../../../config/interfaces';
import { ItemUpdateForm } from './ItemUpdateForm';
import { StyleSheet, SafeAreaView } from 'react-native';

export default function OrderRef()
{
  const [showOrders, setShowOrders] = useState(true)
  const [itemRequests, setItemRequests] = useState([]);
  const [showPastOrders, setshowPastOrders] = useState(false);
  const [showCurrentOrders, setShowCurrentOrders] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [supplierItems, setSupplierItems] = useState<itemInterface[]>([]);
  const [value, setValue] = useState('');


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

  const loadItemRequests = async () =>
  {
    try
    {
      const requestSnapshot: any = await getAllItemRequests();
      const requestArray: any = [];
      requestSnapshot.forEach((doc: any) =>
      {
        requestArray.push({ id: doc.id, ...doc.data() })
      });
      setItemRequests(requestArray);
    } catch (error)
    {
      console.log('Error occurred loading item request data', error);
    }
  }

  const handleItemPress = async () =>
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
  const handleRequestDelete = async (id: string) =>
  {
    const result = await deleteItemRequest(id)
    if (result)
    {
      console.log('Successfully deleted the request');

    }
  }


  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { }} />
        <Appbar.Content title="Test Supplier" />
        <Appbar.Action icon="account" onPress={() => { }} />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'orderClicked',
              label: 'Order History',
              onPress: () =>
              {
                setshowPastOrders(true)
                setShowItems(false)
                loadItemRequests()
              },
            },
            {
              value: 'itemClicked',
              label: 'Active Orders',
              onPress: () =>
              {
                setShowItems(true)
                setshowPastOrders(false)
                console.log(supplierItems)
              },
            }
          ]}
        />
      </SafeAreaView>
      <Divider />
      {showCurrentOrders && supplierItems.length == 0 &&
        <Button loading={true}>Loading Items</Button>}
      {showCurrentOrders && showUpdateForm && <ItemUpdateForm cancelUpdate={handleUpdateCancel} />}
      {showCurrentOrders && supplierItems &&
        <FlatList
          data={supplierItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card onPress={handleItemPress} style={styles.container}>
              {/* <Card.Title title={item.itemName} subtitle="Card Subtitle" /> */}
              <Card.Content>
                <Text variant="titleLarge">{item.itemName}</Text>
                <Text variant="bodyMedium">{item.description}</Text>
              </Card.Content>

              <Card.Actions>
                <Button>Delete</Button>
                <Button>Update</Button>
              </Card.Actions>
            </Card>
          )}
        />}
      {showOrders && showPastOrders &&
        <Button loading={true}>Loading Requests</Button>}
      {showOrders &&
        <FlatList
          data={itemRequests}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: any) => (
            <Card onPress={handleItemPress} style={styles.container}>
              {/* <Card.Title title={item.itemName} subtitle="Card Subtitle" /> */}
              <Card.Content>
                <Text variant="titleLarge">{item.itemName}</Text>
                <Text variant="bodyMedium">{item.description}</Text>
                <Text variant="bodyMedium">{item.unitPrice ? `Unit price: ${item.unitPrice}` : 'Unit Price not set'}</Text>
                <Button style={styles.notApprovedButton}>Accept</Button>
                <Button style={styles.notApprovedButton}>Reject</Button>

              </Card.Content>
              <Card.Cover style={styles.imageHolder} source={require('../../../public/bricks.jpg')} />
              <Card.Actions>
              </Card.Actions>
            </Card>
          )}
        />}
      {showCurrentOrders && !showUpdateForm && <FAB
        icon="plus"
        style={styles.fab}
        onPress={handleFabPress}
      />}
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
  notApprovedButton: {
    borderBlockColor: "red",
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "coral"
  }
});