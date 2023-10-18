import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { UserState } from '../../../config/interfaces';
import { ActivityIndicator, MD2Colors,Button } from 'react-native-paper';
import { View, Platform, StyleSheet, ScrollView,RefreshControl  } from 'react-native'
import { Card, Text } from 'react-native-paper'
import createOrder from '../../hooks/createOrder';
import getAllOrders from '../../hooks/getAllOrders';
import {testCreateOrder} from '../../hooks/test'
import {logout} from '../../hooks/logout'
import updateStatus from '../../hooks/updateStatus';
import { logOut } from '../../../features/user/userSlice';

export default function OrderView({navigation}:any) {
  const [getOrder, setGetOrder] = useState<{
    orderId: string;
    isDraft: boolean;
    itemList: {
      itemName: string;
      unitPrice: number;
      quantity: number;
    }[];
    orderTotal: number;
    deliverySite: string;
    status: string;
    createdAt: Date;
    purchaseDate: Date;
    supplierName: string;
    estimatedDeliveryDate?: Date;
  }[]>([]);
  const [setLoading, setSetLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [order, setOrder] = useState({text:''});
  
  const dispatch = useDispatch()
  let userName: string | null = useSelector((state: { user: UserState }) => state.user.userName);

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

const submitData = async() =>{
      let id = createOrder(order)
      setOrder({text:''})
      if(await id){
      }
    }

const updateOrderStatus = async (orderId:string) =>{
      setSetLoading(true);
      await updateStatus(orderId, "delivery_pending");
      setSetLoading(false);
    }

const topBar = () =>{
  return(
      <View>
      <Card.Actions>
      <Text>{userName}</Text>
        <Button onPress={() => {
          dispatch(logOut())
        }}>Logout</Button>
        <Button
          onPress={() =>
            navigation.navigate('OrderDetails')}>
          View Requested Items
        </Button>
      </Card.Actions>
      </View>
  )
}

const orderView = () =>{
  return(
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
                  Delivery Site:&nbsp;
                  <Text variant="bodyMedium">{order.deliverySite}</Text>
                </Text>
                <Text style={{ fontWeight: 'bold' }}>
                  Supplier:&nbsp;
                  <Text variant="bodyMedium">{order.supplierName}</Text>
                </Text>
                <Text style={{ fontWeight: 'bold' }}>
                  Order Total:&nbsp;
                  <Text variant="bodyMedium">{order.orderTotal}</Text>
                </Text>
                <Text style={{ fontWeight: 'bold' }}>
                  Status:&nbsp;
                  <Text variant="bodyMedium">{order.status}</Text>
                </Text>
              </Card.Content>
            <Card.Actions>
            <Button onPress={() => navigation.navigate('ItemAdd', { orderId: order.orderId })}>
              View Items
            </Button>
            {order.status==='approved' && order.estimatedDeliveryDate!== null ?(
              <Button onPress={() => {updateOrderStatus(order.orderId)}}>
              Set Pending
            </Button>):(
            <Button>
              Confirmed 
            </Button>) 
            }
          </Card.Actions>
        </Card>
      ))
    ) : (
      <Text>Loading</Text>
    )}
      </View>
  )
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
          {topBar()}
          {orderView()}
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