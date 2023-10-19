import { View, Platform, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card, Text, Dialog, Portal, Modal } from 'react-native-paper'
//React Native Paper is used as a facade design pattern through out the application as an abstraction that provides
//a simplified interface to the library, this library offer components with built-in features and functionalities 

import { OrderType } from '../../../config/types';
import { deleteOrder, getOrders, updateOrders } from './OrderController';
import { setUserType,logOut,logUser,setLoading } from '../../../features/user/userSlice';
import { useSelector,useDispatch  } from 'react-redux';

//This function renders all the orders irrespective of the status
export default function ViewOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [selectedOrderId, setSlectedOrderId] = useState<string | null>(null);

  const dispatch = useDispatch()

  const showDialog = (id: any) => {
    setSlectedOrderId(id);
    setVisible(true);
  };
  const hideDialog = () => {
    setSlectedOrderId(null);
    setVisible(false);
  };

  const showDeleteDialog = (id: any) => {
    setSlectedOrderId(id);
    setVisibleDelete(true);
  };
  const hideDeleteDialog = () => {
    setSlectedOrderId(null);
    setVisibleDelete(false);
  };

  //This function retrieves all the orders and set them to the newData state
  async function receiveData() {
    const newData: any = await getOrders()
    setOrders(newData)
  }

  //Observer design pattern is used here, this calls the recieve data function and at the same time oberves the 
  //orders state for any changes and if there are any changes, this will re-render the component 
  useEffect(() => {
    receiveData()
  }, [orders])

  const renderOrder = orders.map((order, index) => {
    let btncolor: string = "blue"
    //This sets the style of the Order status based on the status
    if (order.data.status === 'approval_pending') {
      btncolor = "#DC3545"
    } else if (order.data.status === 'approved') {
      btncolor = "#28A745"
    } else if (order.data.status === 'delivery_pending') {
      btncolor = "#F1C02C"
    } else if (order.data.status === 'delivered') {
      btncolor = "#17A2B8"
    }

      //Iterator design pattern is used here to traverse through the array
      const renderItem:any = (order.data.itemList || []).map((item: any) => {
          return (
            <>
              <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                Item Name:
                <Text variant="bodyMedium">{item.itemName}</Text>
              </Text>
              <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                Quantity:
                <Text variant="bodyMedium">{item.quantity}</Text>
              </Text>
              <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                Unit Price:
                <Text variant="bodyMedium">{item.unitPrice}</Text>
              </Text>
              <Text>{'\n'}</Text>
            </>
          )
      })
 

    return (
      <Card key={index} mode='elevated' style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>Orders</Text>
          <Text variant="bodyMedium">ORD-{order.data.orderId}</Text>
        </Card.Content>
        <Card.Content>
          <View style={styles.btnContainer}>
            <Button mode='contained' buttonColor={btncolor} textColor='white'>{order.data.status}</Button>
          </View>
          <Text style={{ fontWeight: 'bold' }}>
            Order Total:&nbsp;
            <Text variant="bodyMedium">{order.data.orderTotal}</Text>
          </Text>
          <Text style={{ fontWeight: 'bold' }}>
            Delivery Site:&nbsp;
            <Text variant="bodyMedium">{order.data.deliverySite}</Text>
          </Text>
          <Text style={{ fontWeight: 'bold' }}>
            Supplier:&nbsp;
            <Text variant="bodyMedium">{order.data.supplierName}</Text>
          </Text>
          <Text style={{ fontWeight: 'bold' }}>
            Created Date:&nbsp;
            <Text variant="bodyMedium">{order.data.createdAt ? order.data.createdAt.toDate().toLocaleString(): 'N/A'}</Text>
          </Text>
          <Text style={{ fontWeight: 'bold' }}>
            Purchase Date:&nbsp;
            <Text variant="bodyMedium">{order.data.purchaseDate ? order.data.purchaseDate.toDate().toLocaleString(): 'N/A'}</Text>
          </Text>
          <Text style={{ fontWeight: 'bold' }}>
            Estimated Delivery Date:&nbsp;
            <Text variant="bodyMedium">{order.data.estimatedDeliveryDate ? order.data.estimatedDeliveryDate.toDate().toLocaleString(): 'N/A'}</Text>
          </Text>
          <Text>{'\n'}</Text>
          {renderItem}
        </Card.Content>
        <Card.Actions>
          <Button disabled={order.data.status === 'approved'||order.data.status==='delivery_pending'||order.data.status==='delivered'} onPress={() => showDialog(order.id)}>Authorize</Button>
          <Button buttonColor="#DC3545" textColor='white' disabled={order.data.status === 'approved'||order.data.status==='delivery_pending'||order.data.status==='delivered'} onPress={() => showDeleteDialog(order.id)}>Decline Order</Button>
        </Card.Actions>
      </Card>
    )
  })
  
  //This function is to change the status of an order to approved
  //It calls the updateOrders function in order controller
  const approve = () => {
    if (selectedOrderId) {
      updateOrders(selectedOrderId)
    }
    hideDialog()
  }

  //This function deletes the order which is declined by the manager
  const deleteData = async () => {
    if (selectedOrderId) {
      try {
        await deleteOrder(selectedOrderId);
        hideDeleteDialog();
      } catch (error) {
        console.log("Error deleting order: ", error)
      }
    }
  }

  return (
    <>
      <ScrollView style={styles.scrollview}>
      <View style={styles.btnContainer1}>
        <Button mode="contained-tonal" style={styles.btn} onPress={()=>{dispatch(logOut())}}>Logout</Button>
        </View>
        <View style={styles.container}>
          {renderOrder}
        </View>
      </ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyLarge">Are you sure you want to authorize this order?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={approve}>Confirm</Button>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog visible={visibleDelete} onDismiss={hideDeleteDialog} style={styles.dialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyLarge">Are you sure you want to Decline this order?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={deleteData}>Confirm</Button>
            <Button onPress={hideDeleteDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: 200,
  },
  btnContainer1:{
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'flex-end', // Right-align content
    marginTop:20,
    paddingRight: 20, 
  },
  btnContainer: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'flex-end', // Right-align content
  },
  card: {
    width: Platform.OS === 'android' ? '90%' : '50%',
    marginBottom: 20,
    marginTop: 20
  },
  cardCover: {
    width: '100%',
    aspectRatio: 16 / 9,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  containerStyle: {
    width: '100%',
    height: '80%',
    backgroundColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  dialog: {
    width: Platform.OS === 'android' ? '90%': '30%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  scrollview: {
    minHeight: '100%'
  }
})