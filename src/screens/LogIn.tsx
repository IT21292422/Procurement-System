import { View, Text,Button,StyleSheet } from 'react-native'
import React,{useEffect,useState} from 'react'
import NetInfo from '@react-native-community/netinfo';
import { Logings, UserState } from '../../config/interfaces';
import { useSelector,useDispatch } from 'react-redux';
import { setUserType,logUser,setLoading } from '../../features/user/userSlice';
import { HelperText, TextInput } from 'react-native-paper';
import login from '../hooks/login';
import Loading from './Loading';
import { testcreateUser, testcreateUserOnAuth } from '../hooks/test';

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
  }, []);

  NetInfo.fetch().then(state => {
  console.log('Connection type', state.type);
  console.log('Is connected?', state.isConnected);
  });

  const submitLogin= async ()=>{
    dispatch(setLoading(true))
    // example user login
    // const userData = {
    //  userEmail: "procurement_staff@email.com",
    //  password: "12345678",
    //  userType: "procurement_staff",
    // };
    // const {userType,error} = await login(userData.userEmail,userData.password)
    const {userType,error} = await login(logins.email,logins.password)
    // setLogins({...logins,email:'procurement_staff'})
    if(error===null){
      // dispatch(logUser(userData.userEmail))
      dispatch(logUser(logins.email))
      dispatch(setLoading(false))
      dispatch(setUserType(userType))
    }else{
      dispatch(setLoading(false))
      setLogingError(true)
    }
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
      // <View style={[t.flexGrow,t.justifyAround,t.selfStart]}>
      <View style={styles.container}>
      <Text>LogIn</Text>
      <Text>User name {userName}</Text>
      <Text>User name typed {logins.email}</Text>
      <Text>User type {userType}</Text>
      <View>
        <HelperText type="error" visible={logingError}>
          Invalid email or password !!!
        </HelperText>
        <View style={{ margin: 10 }}>
          <TextInput 
          label="Email" 
          value={logins.email} 
          onChangeText={handleEmailChange}
          style={styles.textArea}
          />
        </View>
        <View style={{ margin: 10 }}>
          <TextInput 
          label="Password"  
          value={logins.password} 
          onChangeText={handlePasswordChange} 
          secureTextEntry={true}
          style={styles.textArea}
          />
        </View>
      </View>
      <Button 
        title='Login here' 
        color={'rgb(127, 0, 255)'} 
        onPress={()=>submitLogin()}/>
      
      <Button title='test create user' onPress={() => testcreateUserOnAuth()}/>
      
      <Button title='change to manager' onPress={() => dispatch(setUserType('manager'))}/>
      <Button title='change to site_manager' onPress={() => dispatch(setUserType('site_manager'))}/>
      <Button title='change to procurement_staff' onPress={() => {
        dispatch(setUserType('procurement_staff'))
        dispatch(logUser('hello'))
      }}/>
      <Button title='change to supplier' onPress={() => dispatch(setUserType('supplier'))}/>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textArea:{ 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: 'gray' 
  },
  button:{
    borderRadius:30,
  }
}) 