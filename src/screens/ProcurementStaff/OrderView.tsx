import React,{useEffect,useState} from 'react'
import { setUserType,logOut,logUser,setLoading } from '../../../features/user/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { UserState } from '../../../config/interfaces';
import { ActivityIndicator, MD2Colors,Button } from 'react-native-paper';
import { View, Platform, StyleSheet, ScrollView,RefreshControl  } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { Modal, Portal, TextInput} from 'react-native-paper';
import createOrder from './hooks/createOrder';import getAllOrders from './hooks/getAllOrders';
import {testCreateOrder} from './hooks/test'


export default function OrderView({navigation}:any) {
  const [getOrder, setGetOrder] = useState<{ 
    orderId: string;
    isDraft: boolean;
    quantity: number;
    orderTotal: number;
    deliverySite: string;
    status: string;
    createdAt: Date;
    purchaseDate: Date;
    supplierId: string;
   }[]>([]);
  const [setLoading, setSetLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
    setSetLoading(true);
    const allOrders = await getAllOrders();
    setGetOrder(allOrders);
    setSetLoading(false);
  };
  
  fetchData();
}, []);

const handleRefresh = async () => {
  setSetLoading(true);
  setIsRefreshing(true);
  const refreshedData = await getAllOrders();
  setGetOrder(refreshedData);
  setIsRefreshing(false);
  setSetLoading(false);
};

const [visible, setVisible] = useState(false);
const [order, setOrder] = useState({text:''});

const showModal = () => setVisible(true);
const hideModal = () => setVisible(false);

const dispatch = useDispatch()
let userType: string | null = useSelector((state: { user: UserState }) => state.user.userType);
let userName: string | null = useSelector((state: { user: UserState }) => state.user.userName);

// const renderOrder = 

    // submit the new order for testing
    const submitData = async() =>{
      let id = createOrder(order)
      setOrder({text:''})
      if(await id){
        hideModal()
      }
    }
    
    if(setLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </View>
      )
    }else{
      return (
        <ScrollView style={styles.scrollview}         
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }>
      <Portal>
        <Modal visible={visible} contentContainerStyle={styles.containerStyle}>
            <TextInput
              label="Email"
              value={order.text}
              onChangeText={text => setOrder({text})}
              />
          <Button onPress={() => {
            submitData()
          }}>Add order</Button>
          <Button onPress={() => {
            hideModal()
          }}>Cancel</Button>
        </Modal>
      </Portal>
      <View>
        <Text>OrderView for {userName}</Text>
        <Button onPress={() => {
          dispatch(setUserType(null))
          dispatch(logOut())
        }}>Logout</Button>
        <Button onPress={() => {
          showModal()
        }}>New Order</Button>
        <Button onPress={() => {
          testCreateOrder()
        }}>add test Order</Button>
      </View>
      <View style={styles.container}>
        {getOrder ? (
      getOrder.map((order, index) => (
        <Card key={index} mode='elevated' style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>{order.status}</Text>
            <Text variant="bodyMedium">{order.orderId}</Text>
          </Card.Content>
          <Card.Content>
            <Text style={{ fontWeight: 'bold' }}>
              Quantity:&nbsp;
              <Text variant="bodyMedium">{order.quantity}</Text>
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              Supplier:&nbsp;
              <Text variant="bodyMedium">{order.supplierId}</Text>
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              Date To Receive:&nbsp;
              <Text variant="bodyMedium">{order.deliverySite}</Text>
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button
              onPress={() => navigation.navigate('ItemAdd', { orderId: order.orderId })}
            >
              View Items
            </Button>
            <Button 
              onPress={() => {
                
              }}
            >
              Confirm Order
            </Button> 
            {/* Your pop-up code should go here */}
          </Card.Actions>
        </Card>
      ))
    ) : (
      <Text>Loading</Text>
    )}
      </View>
    </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  card: {
    width: Platform.OS === 'android' ? '90%' : '50%',
    marginBottom: 10,
    marginTop: 5
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
    //top: 20
  },
  scrollview: {
    minHeight: '100%'
  }
  ,
  containerStyle : {
    backgroundColor: 'white', 
    padding: 20}
  })
  
  // const orders = [
  //   {
  //     orderId: "ORD-1234",
  //     isDraft: false,
  //     quantity: 100,
  //     orderTotal: 5000,
  //     deliverySite: "Construction Site A",
  //     status: "approved",
  //     createdAt: new Date("2023-10-10"),
  //     purchaseDate: new Date("2023-10-05"),
  //     supplierId: "supplier-001",
  //   },
  //   {
  //     orderId: "ORD-5678",
  //     isDraft: false,
  //     quantity: 5000,
  //     orderTotal: 7500,
  //     deliverySite: "Construction Site B",
  //     status: "delivery_pending",
  //     createdAt: new Date("2023-10-08"),
  //     purchaseDate: new Date("2023-10-03"),
  //     supplierId: "supplier-002",
  //   },
  //   {
  //     orderId: "ORD-9101",
  //     isDraft: false,
  //     quantity: 50,
  //     orderTotal: 2500,
  //     deliverySite: "Construction Site C",
  //     status: "delivered",
  //     createdAt: new Date("2023-10-12"),
  //     purchaseDate: new Date("2023-10-06"),
  //     supplierId: "supplier-003",
  //   },
  //   {
  //     orderId: "ORD-1213",
  //     isDraft: false,
  //     quantity: 200,
  //     orderTotal: 3000,
  //     deliverySite: "Construction Site D",
  //     status: "approved",
  //     createdAt: new Date("2023-10-09"),
  //     purchaseDate: new Date("2023-10-04"),
  //     supplierId: "supplier-004",
  //   },
  //   {
  //     orderId: "ORD-1415",
  //     isDraft: false,
  //     itemName: "Paint",
  //     quantity: 10,
  //     orderTotal: 1000,
  //     deliverySite: "Construction Site E",
  //     status: "approval_pending",
  //     createdAt: new Date("2023-10-11"),
  //     purchaseDate: new Date("2023-10-07"),
  //     supplierId: "supplier-005",
  //   },
  // ];