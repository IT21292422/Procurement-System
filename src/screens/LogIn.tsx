import { View, Text,StyleSheet,Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import NetInfo from '@react-native-community/netinfo';
import { Logings, UserState } from '../../config/interfaces';
import { useSelector,useDispatch } from 'react-redux';
import { setUserType,logUser,setLoading } from '../../features/user/userSlice';
import { HelperText, TextInput,Button, Card } from 'react-native-paper';
import login from '../hooks/login';
import Loading from './Loading';

export default function LogIn() {
  const [logins, setLogins] = useState<Logings>({
    email:'',
    password:''
  });
  const [logingError, setLogingError] = useState(false);

  const dispatch = useDispatch()

  let userName: string | null = useSelector((state: { user: UserState }) => state.user.userName);
  let userType: string | null = useSelector((state: { user: UserState }) => state.user.userType);
  let isLoading: boolean = useSelector((state: { user: UserState }) => state.user.isLoading);

  useEffect(() => {
    dispatch(setLoading(false))
    
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
  }, []);
    
  const submitLogin= async ()=>{
//* four main users who can access the system
    if(logins.email===''){
      setLogingError(true)
      return;
    }
    switch (logins.email) {
      case 'procurement_staff':
      case 'site_manager':
      case 'supplier':
      case 'manager':
        break; // No error
      default:
        setLogingError(true);
        return;
    }

// manager
// site_manager
// supplier
// procurement_staff
    dispatch(setLoading(true))
    dispatch(setUserType(logins.email))
    dispatch(logUser(logins.email))
    dispatch(setLoading(false))
  }
  
  const handleEmailChange = (text:string) => {
    setLogins({ ...logins, email: text });
  };

  const handlePasswordChange = (text:string) => {
    setLogins({ ...logins, password: text });
  };
  
  if(isLoading){
    return (
      <Loading/>
      )
    }else{
      return (
      <View style={styles.container}>
      <Text style={styles.texts}>Procurement System</Text>
      <Image
        style={styles.image}
        source={require('../../assets/favicon.png')}
      />
      <View>
        <HelperText type="error" visible={logingError}>
          Invalid email or password !!!
        </HelperText>
        <View style={styles.textInputs}>
          <TextInput 
          label="User Name" 
          value={logins.email} 
          onChangeText={handleEmailChange}
          style={styles.textArea}
          />
        </View>
        <View style={styles.textInputs}>
          <TextInput 
          label="Password"  
          value={logins.password} 
          onChangeText={handlePasswordChange} 
          secureTextEntry={true}
          style={styles.textArea}
          />
        </View>
      </View>
        <Card.Actions>
          <Button
        onPress={()=>{submitLogin()}}
        labelStyle={styles.button}
          ><Text style={{color:'purple'}}>Login</Text></Button>
        </Card.Actions>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  texts:{
    fontSize:20,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textArea:{ 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: 'white',
    color:'white'
  },
  button:{
    borderRadius:30,
    width:100,
    color:'rgb(51, 133, 255)',
  },
  image:{
    resizeMode: 'cover',
    height: 200,
    width: 200,
  },
  textInputs:{
    margin: 10,
    color:'white',
    width:300
  }
}) 

// const {userType,error} = await login(logins.email,logins.password)
// dispatch(setUserType('manager'))
// manager
// site_manager
// supplier
// procurement_staff
// setLogins({...logins,email:'procurement_staff'})
// dispatch(logUser(userData.userEmail))