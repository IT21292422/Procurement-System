import { FlatList, Image, View } from 'react-native'
import { getAllItemRequests, deleteItemRequest, getAllItems, getAllOrders, getCompletedOrders } from '../../../utils/dbFunctions';

import React, { useEffect, useState } from 'react'
import { Surface, Text, SegmentedButtons, Avatar, Card, Button, Divider, FAB, Appbar, useTheme } from 'react-native-paper';
import { itemInterface, orderInterface } from '../../../config/interfaces';
import { ItemUpdateForm } from './ItemUpdateForm';
import { StyleSheet, SafeAreaView } from 'react-native';

export default function OrderRef()
{
  const [showOrders, setShowOrders] = useState(true)
  const [itemRequests, setItemRequests] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [supplierItems, setSupplierItems] = useState<itemInterface[]>([]);
  const [value, setValue] = useState('');
  
  // using
  const [showPastOrders, setshowPastOrders] = useState(false);
  const [showCurrentOrders, setShowCurrentOrders] = useState<boolean>(true)
  const [currentOrders, setCurrentOrders] = useState<orderInterface[]>([])
  const [pastOrders, setPastOrders] = useState<orderInterface[]>([])

  useEffect(() =>
  {
    const loadData = async () =>
    {
      try
      {
        const ordersSnapshot: any = await getAllOrders();
        const ordersArray: orderInterface[] = [];
        ordersSnapshot.forEach((doc: any) =>
        {
          ordersArray.push({ id: doc.id, ...doc.data() });
        });

        setCurrentOrders(ordersArray);
      } catch (error)
      {
        console.log('Error occurred loading orders', error);
      }

    }
    loadData();
    console.log('calling loadData() function');
  }, [])

  const loadPastOrders = async () =>
  {
    try
    {
      console.log('Calling loadPastOrders() function');
      const requestSnapshot: any = await getCompletedOrders();
      const requestArray: orderInterface[] = [];
      requestSnapshot.forEach((doc: any) =>
      {
        requestArray.push({ id: doc.id, ...doc.data() })
      });
      setPastOrders(requestArray);
    } catch (error)
    {
      console.log('Error occurred loading request data', error);
    }    
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
                setShowCurrentOrders(false)
                loadPastOrders();
              },
            },
            {
              value: 'itemClicked',
              label: 'Active Orders',
              onPress: () =>
              {
                setShowCurrentOrders(true)
                setshowPastOrders(false)
                console.log(currentOrders)
              },
            }
          ]}
        />
      </SafeAreaView>
      <Divider />
      {showCurrentOrders && currentOrders.length == 0 &&
        <Button loading={true}>Loading Items</Button>}
      {showCurrentOrders && currentOrders &&
        <FlatList
          data={currentOrders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card style={styles.container}>
              {/* <Card.Title title={item.itemName} subtitle="Card Subtitle" /> */}
              <Card.Content>
                <Text variant="titleLarge">{item.orderId}</Text>
                <Text variant="bodyMedium">To delivery site + {item.deliverySite}</Text>
                <Text variant="bodyMedium">{item.estimatedDeliveryDate.toString()}</Text>

              </Card.Content>

              <Card.Actions>
                <Button>Delete</Button>
                <Button>Update</Button>
              </Card.Actions>
            </Card>
          )}
        />}

        
      {showPastOrders && pastOrders.length == 0 &&
        <Button loading={true}>Loading Requests</Button>}
      {showOrders &&
        <FlatList
          data={pastOrders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card style={styles.container}>
              {/* <Card.Title title={item.itemName} subtitle="Card Subtitle" /> */}
              <Card.Content>
                <Text variant="titleLarge">{item.orderId}</Text>
                <Text variant="bodyMedium">{item.deliverySite}</Text>
                <Text variant="bodyMedium">{item.orderTotal}</Text>
                <Text variant="bodyMedium">{item.status == 'delivered' ? `Order completed` : 'Oops something went wrong'}</Text>
                <Button style={styles.notApprovedButton}>Accept</Button>
                <Button style={styles.notApprovedButton}>Reject</Button>

              </Card.Content>
              <Card.Cover style={styles.imageHolder} source={require('../../../public/bricks.jpg')} />
              <Card.Actions>
              </Card.Actions>
            </Card>
          )}
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