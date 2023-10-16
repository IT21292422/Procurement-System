import React,{useEffect,useState} from 'react'
import { View, Platform, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { Items } from '../../../config/interfaces';
import { ActivityIndicator, MD2Colors,Button } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import { Modal, Portal, TextInput,Card,Text} from 'react-native-paper';
import createItem from '../../hooks/createItem';
import getAllItems from '../../hooks/getAllItems';
import { testCreateItem } from '../../hooks/test';
import { ItemAddRouteProp, RootStackParamList } from '../../../config/types';

const ItemAdd: React.FC<{ route: ItemAddRouteProp,navigation:NavigationProp<RootStackParamList> }> = ({ route,navigation }) => {
  const {orderId} = route.params;
  
  const [visible, setVisible] = useState(false);
  const [getItem, setGetItem] = useState<Items[]>([]);
  const [setLoading, setSetLoading] = useState(true);
  const [itemData, setItemData] = useState<Items>({
    itemName:'',
    unitPrice:0,
    quantity:0,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
    setSetLoading(true);
    console.log('order id in itemAdd',orderId);
    const allItems:Items[] = await getAllItems(orderId);
    setGetItem(allItems)
    setSetLoading(false);
    };
  
    fetchData();
  }, []);
  
  const showModal = () => {
    setItemData({
      itemName:'',
      unitPrice:0,
      quantity:0
    })
    setVisible(true)
  };
  const hideModal = () => setVisible(false);
  
  const submitData = async() =>{
    setSetLoading(true)
    await createItem(orderId,itemData)
    setSetLoading(false)
    hideModal()
  } 

  const handleRefresh = async () => {
  setSetLoading(true);
  setIsRefreshing(true);
  const allItems:Items[] = await getAllItems(orderId);
  setGetItem(allItems)
  setIsRefreshing(false);
  setSetLoading(false);
};

const itemAddModal:any = () =>{
  return(
      <Portal>
        <Modal visible={visible} contentContainerStyle={styles.containerStyle}>
            <TextInput
              label="Item name"
              value={itemData.itemName}
              onChangeText={item => setItemData({...itemData,itemName:item})}
              />
            <TextInput
              label="Unit price"
              value={itemData.unitPrice.toString()}
              onChangeText={item => setItemData({...itemData,unitPrice: parseInt(item, 10)})}
              />
            <TextInput
              label="Quantity"
              value={itemData.quantity.toString()}
              onChangeText={item => setItemData({...itemData,quantity: parseInt(item, 10)})}
              />
          <Card.Actions>
          <Button onPress={() => {
            submitData()
          }}>Add Item</Button>
          <Button onPress={() => {
            hideModal()
          }}>Cancel</Button>
          </Card.Actions>
        </Modal>
      </Portal>
  )
}

const topBar = () =>{
  return(
      <View>
        <Card.Actions>
        <Text>Items for order : {orderId}</Text>
        <Button
            onPress={() => navigation.navigate('OrderView')}
            >To Order View</Button>
        <Button onPress={() => {
          showModal()
        }}>New Item</Button>
        </Card.Actions>
      </View>
  )
}

const itemListView = () =>{
  return(
      <View style={styles.container}>
      {getItem.length > 0 ? (
        getItem.map((item, index) => (
          <Card key={index} mode="elevated" style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
                Item id : {item.itemName}
              </Text>
            </Card.Content>
            <Card.Content>
              <Text style={{ fontWeight: 'bold' }}>
                Quantity:&nbsp;
                <Text variant="bodyMedium">{item.quantity}</Text>
              </Text>
              <Text style={{ fontWeight: 'bold' }}>
                Unit price:&nbsp;
                <Text variant="bodyMedium">{item.unitPrice}</Text>
              </Text>
            </Card.Content>
          </Card>
        ))
      ) : (
        <View style={styles.container}>
          <Text>No Items</Text>
        </View>
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
          {itemAddModal()}
          {itemListView()}
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
    padding: 20,
    borderRadius: 16,
    margin:10
  }
  })