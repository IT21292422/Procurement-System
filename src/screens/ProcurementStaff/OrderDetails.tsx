import { View,StyleSheet } from 'react-native'
import React,{useState,useEffect} from 'react'
import { setUserType,logOut,logUser,setLoading } from '../../../features/user/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { UserState } from '../../../config/interfaces';
import { ActivityIndicator, MD2Colors,Button,Card,Text } from 'react-native-paper';

export default function ProcunentOrderDetails({route,navigation}) {

  const {orderId} = route.params;

  const dispatch = useDispatch()
  let userName: string | null = useSelector((state: { user: UserState }) => state.user.userName);
  const [setLoading, setSetLoading] = useState(true);

  useEffect(() => {
    setSetLoading(false)
  }, []);

    if(setLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </View>
      )
    }else{
      return (
      <View style={styles.container}>
        <Card  mode='elevated' style={styles.card}>
          <Card.Content><Text>Order : {orderId}</Text></Card.Content>
          <Card.Content>
            <Text style={{ fontWeight: 'bold' }}>
              Quantity:&nbsp;
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              Supplier:&nbsp;
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              Date To Receive:&nbsp;
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button
          onPress={() => navigation.navigate('ItemAdd',{orderId})}
            >Back to items</Button>
          </Card.Actions>
        </Card>
      </View>
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
    padding: 20}
})