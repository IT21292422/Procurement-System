import { View, Text,Button } from 'react-native'
import React,{useEffect,useState} from 'react'
import { t } from 'react-native-tailwindcss';
import NetInfo from '@react-native-community/netinfo';
import { Logings, UserState } from '../../config/interfaces';
import { useSelector,useDispatch } from 'react-redux';
import { setUserType,logUser,setLoading } from '../../features/user/userSlice';
import { HelperText, TextInput } from 'react-native-paper';
import login from '../hooks/login';
import Loading from './Loading';
import { testcreateUser } from '../hooks/test';

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
    const {userType,error} = await login(logins.email,logins.password)
    // setLogins({...logins,email:'procurement_staff'})
    // const {userType,error} = await login(logins.email,'12345678')
    if(error===null){
      dispatch(logUser(logins.email))
      dispatch(setLoading(false))
      dispatch(setUserType(userType))
      dispatch(setLoading(false))
    }
    dispatch(setLoading(false))
    // setLogingError(true)
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
      <View style={[t.flexGrow,t.justifyAround,t.selfStart]}>
      <Text>LogIn</Text>
      <Text>User name {userName}</Text>
      <Text>User name typed {logins.email}</Text>
      <Text>User type {userType}</Text>
      <View>
        <HelperText type="error" visible={logingError}>
          Invalid email or password !!!
        </HelperText>
        <TextInput label="Email" value={logins.email} onChangeText={handleEmailChange}/>
        <TextInput label="Password"  value={logins.password} onChangeText={handlePasswordChange} secureTextEntry={true}/>
      </View>
      <Button title='Login here' onPress={()=>submitLogin()}/>
      
      <Button title='test create procurement' onPress={() => testcreateUser ()}/>
      
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