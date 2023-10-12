import React,{useEffect,useState} from 'react'
import { setUserType,logOut,logUser,setLoading } from '../../../features/user/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { View, Platform, StyleSheet, ScrollView } from 'react-native'
import { UserState } from '../../../config/interfaces';
import { ActivityIndicator, MD2Colors,Button } from 'react-native-paper';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Modal, Portal, TextInput,Card,Text} from 'react-native-paper';
import createItem from './hooks/createItem';
import getAllItems from './hooks/getAllItems';
import { testCreateItem } from './hooks/test';


type RootStackParamList = {
  ItemAdd: { orderId: any }; // Assuming itemId is a string
};

type ItemAddRouteProp = RouteProp<RootStackParamList, 'ItemAdd'>;

const ItemAdd: React.FC<{ route: ItemAddRouteProp,navigation:NavigationProp<RootStackParamList> }> = ({ route,navigation }) => {
  const {orderId} = route.params;
  
  const [visible, setVisible] = useState(false);
  const [getItem, setGetItem] = useState<{  
    orderId: string;
    itemId: string;
    itemName: string;
    description: string;
    unit: string;
    unitPrice: number;
    policy: string;
  }[]>([]);
  const [setLoading, setSetLoading] = useState(true);
  const [itemData, setItemData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
    setSetLoading(true);
    const allItems = await getAllItems(orderId);
    setGetItem(allItems)
    setSetLoading(false);
    };
  
    fetchData();
  }, []);
  
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  
  const dispatch = useDispatch()
  let userName: string | null = useSelector((state: { user: UserState }) => state.user.userName);
  
  const submitData = async() =>{
    setSetLoading(true)
    let id = await createItem(getItem)
    // setItemData({ })
    if(await id){
      hideModal()
    }
    setSetLoading(false)
    } 
    
    const addTestItem = async() =>{
      setSetLoading(true)
      let id = await testCreateItem(orderId)
      if(await id){
        setSetLoading(false)
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
        <ScrollView style={styles.scrollview}>
      <Portal>
        <Modal visible={visible} contentContainerStyle={styles.containerStyle}>
            <TextInput
              label="Item name"
              value={'hello'}
              onChangeText={item => setItemData(item)}
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
        <Text>OrderView for {orderId}</Text>
        <Button onPress={() => {
          showModal()
        }}>New Item</Button>
        <Button
          onPress={() => navigation.navigate('OrderView')}
          >Order View</Button>
        <Button
          onPress={() => {
            addTestItem()
          }}
          >add test item</Button>
      </View>
            <View style={styles.container}>
      {getItem ? (
        getItem.map((item, index) => (
          <Card key={index} mode="elevated" style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
                Item id : {item.itemId}
              </Text>
              <Text variant="bodyMedium">{item.itemName}</Text>
            </Card.Content>
            <Card.Content>
              <Text style={{ fontWeight: 'bold' }}>
                Description:&nbsp;
                <Text variant="bodyMedium">{item.description}</Text>
              </Text>
              <Text style={{ fontWeight: 'bold' }}>
                Unit:&nbsp;
                <Text variant="bodyMedium">{item.unit}</Text>
              </Text>
              <Text style={{ fontWeight: 'bold' }}>
                Unit Price:&nbsp;
                <Text variant="bodyMedium">{item.unitPrice}</Text>
              </Text>
              <Text style={{ fontWeight: 'bold' }}>
                Policy:&nbsp;
                <Text variant="bodyMedium">{item.policy}</Text>
              </Text>
            </Card.Content>
            <Card.Actions>
              {/* This goes to single item view in ProcunentOrderDetails */}
              <Button
                onPress={() => navigation.navigate('OrderDetails', { orderId: item.orderId, itemId:item.itemId })}
              >View Item</Button>
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

export default ItemAdd;

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

  // const getItem = [
  //   {
  //     orderId: "order-001",
  //     itemId: "item-001",
  //     itemName: "Cement",
  //     description: "High-quality cement for construction",
  //     unit: "per bag",
  //     unitPrice: 10.99,
  //     policy: "Standard delivery policy",
  //   },
  //   {
  //     orderId: "order-002",
  //     itemId: "item-002",
  //     itemName: "Bricks",
  //     description: "Red bricks for building",
  //     unit: "per 1000 bricks",
  //     unitPrice: 299.99,
  //     policy: "Fast delivery policy",
  //   },
  //   {
  //     orderId: "order-001",
  //     itemId: "item-003",
  //     itemName: "Paint",
  //     description: "Interior and exterior paint",
  //     unit: "per gallon",
  //     unitPrice: 25.49,
  //     policy: "Eco-friendly policy",
  //   },
  //   {
  //     orderId: "order-003",
  //     itemId: "item-004",
  //     itemName: "Wood Planks",
  //     description: "Hardwood planks for flooring",
  //     unit: "per board foot",
  //     unitPrice: 2.99,
  //     policy: "Sustainable sourcing policy",
  //   },
  //   {
  //     orderId: "order-002",
  //     itemId: "item-005",
  //     itemName: "Roofing Shingles",
  //     description: "Asphalt roofing shingles",
  //     unit: "per bundle",
  //     unitPrice: 19.99,
  //     policy: "Weather-resistant policy",
  //   },
  // ];