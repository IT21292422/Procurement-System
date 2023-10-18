import { View,StyleSheet, RefreshControl, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { IRequestedItems,IItem } from '../../../config/interfaces';
import { ActivityIndicator, MD2Colors,Button,Modal, Portal, TextInput,Card,Text} from 'react-native-paper';
import getItemRequests from '../../hooks/getItemRequests'
import addSystemItem from '../../hooks/addSystemItem';

export default function ProcunentOrderDetails({navigation}) {
  const [setLoading, setSetLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [itemRequested, setItemRequested] = useState<IRequestedItems[]>([]);
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState<IItem>({
  orderId: '',
  itemId: '',
  itemName: '',
  description: '',
  unit: '',
  unitPrice: 0,
  policyName: '',
  });

  useEffect(() => {
    const fetchRequests = async () =>{
      setSetLoading(true)
      const requestedItems:IRequestedItems[] = await getItemRequests()
      setItemRequested(requestedItems)
      setSetLoading(false)
    }
    fetchRequests()
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setItem({
      orderId: '',
      itemId: '',
      itemName: '',
      description: '',
      unit: '',
      unitPrice: 0,
      policyName: '',
    });
  };

  const handleRefresh = async () => {
  setSetLoading(true);
  setIsRefreshing(true);
  const requestedItems:IRequestedItems[] = await getItemRequests()
  setItemRequested(requestedItems)
  setIsRefreshing(false);
  setSetLoading(false);
  };

  const submitItemData = async () =>{
  setSetLoading(true);
  await addSystemItem(item)
  setSetLoading(false);
  }

  const addSystemItemModal = () =>{
    showModal()
  }

  const topBar = () =>{
    return(
      <View>
      <Card.Actions>
        <Button onPress={() => {
          addSystemItemModal()
        }}>Add Item</Button>
        <Button
          onPress={() =>
            navigation.navigate('OrderView')}>
          Order View
        </Button>
      </Card.Actions>
      </View>
    )
  }

  const sysItemAddModal:any = () =>{
  return(
   <Portal>
      <Modal visible={visible} contentContainerStyle={styles.containerStyle}>
        <TextInput
          label="Order ID"
          value={item.orderId}
          onChangeText={(text) =>
            setItem({ ...item, orderId: text })
          }
        />
        <TextInput
          label="Item ID"
          value={item.itemId}
          onChangeText={(text) =>
            setItem({ ...item, itemId: text })
          }
        />
        <TextInput
          label="Item Name"
          value={item.itemName}
          onChangeText={(text) =>
            setItem({ ...item, itemName: text })
          }
        />
        <TextInput
          label="Description"
          value={item.description}
          onChangeText={(text) =>
            setItem({ ...item, description: text })
          }
        />
        <TextInput
          label="Unit"
          value={item.unit}
          onChangeText={(text) =>
            setItem({ ...item, unit: text })
          }
        />
        <TextInput
          label="Unit Price"
          value={item.unitPrice.toString()}
          onChangeText={(text) =>
            setItem({ ...item, unitPrice: parseInt(text, 10) })
          }
        />
        <TextInput
          label="Policy Name"
          value={item.policyName}
          onChangeText={(text) =>
            setItem({ ...item, policyName: text })
          }
        />
        <Card.Actions>
          <Button onPress={submitItemData}>Add Item</Button>
          <Button onPress={hideModal}>Cancel</Button>
        </Card.Actions>
      </Modal>
    </Portal>
  )
}

  const requestedItemView = () =>{
    return(
      <View style={styles.container}>
      {itemRequested.length? (
        itemRequested.map((item, index) => (
        <Card key={index} mode='elevated' style={styles.card}>
            <Card.Content>
              <Text variant="bodyMedium">{item.itemName}</Text>
            </Card.Content>
            <Card.Content>
                <Text style={{ fontWeight: 'bold' }}>
                  Item status:&nbsp;
                  {item.isApproved?(
                    <Text variant="bodyMedium" style={{backgroundColor:'green'}}>Approved</Text>
                  ):(
                    <Text variant="bodyMedium">Pending</Text>
                  )}
                </Text>
                <Text>
                  Description:&nbsp;
                  <Text variant="bodyMedium">{item.description}</Text>
                </Text>
            </Card.Content>
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
          {sysItemAddModal()}
          {requestedItemView()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  cardCover: {
    width: '100%',
    aspectRatio: 16 / 9,
    alignSelf: 'center'
  },
  card: {
    width:'95%',
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
    },
  containerStyle : {
    backgroundColor: 'white', 
    padding: 20,
    borderRadius: 16,
    margin:10
  }
})