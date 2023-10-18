import { FlatList, Image, View } from 'react-native'
import { getAllItemRequests, deleteItemRequest, getAllItems, getAllOrders, getCompletedOrders, rejectOrder, dateToString } from '../../../utils/dbFunctions';

import React, { useEffect, useState } from 'react'
import { Surface, Text, SegmentedButtons, Avatar, Card, Button, Divider, FAB, Appbar, TextInput } from 'react-native-paper';
import { itemInterface, orderInterface, orderItemsinterface, UserState } from '../../../config/interfaces';
import { ItemUpdateForm } from './ItemUpdateForm';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import DatePicker from 'react-native-date-picker'
import { DatePickerHook } from './datePicker';
import { setUserType,logOut,logUser,setLoading } from '../../../features/user/userSlice';
import { useSelector,useDispatch } from 'react-redux';


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
  const [pastOrders, setPastOrders] = useState<orderInterface[]>([])
  const [currentOrders, setCurrentOrders] = useState<orderInterface[]>([])
  const [orderItems, setOrderItems] = useState<orderItemsinterface[]>([])
  const [showDeliveryInput, setShowDeliveryInput] = useState(false)
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState()

  // form hook initialization
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      deliveryDate: undefined,
    }
  });

  const dispatch = useDispatch()


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

  useEffect(() =>
  {
    const allItemLists = currentOrders.map(order => order.itemList).flat();
    setOrderItems(allItemLists);
  }, [currentOrders])


  const rejectOrderStatus = async (id: string) =>
  {
    console.log(`rejecting order with id ${id}`);

    const result = await rejectOrder(id);
    if (result)
    {
      console.log('Successfully rejected the order');
    } else
    {
      console.log('Rejection not succesful');
    }
  }


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
      console.log(orderItems);

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

  const handleDeliveryDateInput = () =>
  {
    setShowDeliveryInput(true);
  }

  const uploadDate = (data: any) =>
  {
    console.log(`Called upload date with this data ${data}`);

  }


  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { }} />
        <Appbar.Content title="Test Supplier" />
        <Appbar.Action icon="logout" onPress={() => {dispatch(logOut())}} />
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
                <Text variant="bodyMedium">To delivery site: {item.deliverySite}</Text>
                <Text variant="bodyMedium">Requested delivery date {dateToString(item.estimatedDeliveryDate)}</Text>
                <FlatList
                  data={orderItems}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Card style={styles.container}>
                      <Card.Content>
                        <Text variant="bodyMedium">Item name: {item.itemName}</Text>
                        <Text variant="bodyMedium">Quantity: {item.quantity}</Text>
                        <Text variant="bodyMedium">Unit Price: {item.unitPrice}</Text>
                      </Card.Content>
                    </Card>
                  )}
                />
              </Card.Content>
              <Card.Actions style={styles.buttonGroup}>
                {showDeliveryInput && <DatePickerHook control={control} name="estimatedDeliveryDatelivery" value={deliveryDate} />}
                <Button icon="check" style={styles.acceptButton} onPress={handleDeliveryDateInput}>Accept</Button>
                {showDeliveryInput && <Button icon="close" style={styles.acceptButton} onPress={() => setShowDeliveryInput(false)}>Cancel</Button>}
                {!showDeliveryInput && <Button icon="close" style={styles.acceptButton} onPress={() => { rejectOrderStatus(item.id) }}>Reject</Button>}
                {/* <Button style={styles.acceptButton} onPress={handleSubmit(uploadDate)}>Confirm</Button> */}

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
                <Text variant="bodyMedium">Delivered at {dateToString(item.estimatedDeliveryDate)}</Text>
                <Button icon="check">Delivered</Button>

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
  },
  acceptButton: {
    marginVertical: 2
  },
  rejectButton: {

  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 4
  }
});