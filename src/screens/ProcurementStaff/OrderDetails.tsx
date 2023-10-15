import { View,StyleSheet, RefreshControl, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { logOut } from '../../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { IRequestedItems, UserState } from '../../../config/interfaces';
import { ActivityIndicator, MD2Colors,Button,Card,Text } from 'react-native-paper';
import getItemRequests from '../../hooks/getItemRequests'

export default function ProcunentOrderDetails({navigation}) {
  const dispatch = useDispatch()
  const [setLoading, setSetLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [itemRequested, setItemRequested] = useState<IRequestedItems[]>([]);

  useEffect(() => {
    const fetchRequests = async () =>{
      setSetLoading(true)
      const requestedItems:IRequestedItems[] = await getItemRequests()
      setItemRequested(requestedItems)
      setSetLoading(false)
    }
    fetchRequests()
  }, []);

  const handleRefresh = async () => {
  setSetLoading(true);
  setIsRefreshing(true);
  const requestedItems:IRequestedItems[] = await getItemRequests()
  setItemRequested(requestedItems)
  setIsRefreshing(false);
  setSetLoading(false);
  };

  const topBar = () =>{
    return(
      <View>
      <Card.Actions>
        <Button onPress={() => {
          dispatch(logOut())
          // logout()
        }}>Logout</Button>
        <Button
          onPress={() =>
            navigation.navigate('OrderView')}>
          Order View
        </Button>
      </Card.Actions>
      </View>
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
                    <Text variant="bodyMedium">Approved</Text>
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
  containerStyle : {
    backgroundColor: 'white', 
    padding: 20},
  scrollview: {
    minHeight: '100%'
    }
})