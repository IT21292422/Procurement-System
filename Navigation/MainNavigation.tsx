import { View, Text } from 'react-native'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Draft from '../src/screens/SiteManager/Draft/Draft';
import ItemsList from '../src/screens/SiteManager/Item/ItemsList';
import OrderRef from '../src/screens/Supplier/OrderRef';
import SupplierProfile from '../src/screens/Supplier/SupplierProfile';
import CreatePolicy from '../src/screens/TheManager/CreatePolicy';
import OrderDetails from '../src/screens/TheManager/OrderDetails';
import ProcunentOrderDetails from '../src/screens/ProcurementStaff/OrderDetails';
import PendingOrders from '../src/screens/TheManager/PendingOrders';
import ViewOrders from '../src/screens/TheManager/ViewOrders';
import ItemAdd from '../src/screens/ProcurementStaff/ItemAdd';
import OrderPurchase from '../src/screens/ProcurementStaff/OrderPurchase';
import OrderView from '../src/screens/ProcurementStaff/OrderView';
import { UserState } from '../config/interfaces';
import Loading from '../src/screens/Loading';
import LogIn from '../src/screens/LogIn';
import UnknownUserScreen from '../src/screens/UnknownUserScreen';
import OrderList from '../src/screens/SiteManager/Order/OrderList';
import NewItemRequests from '../src/screens/SiteManager/NewItemRequest/newItemRequests';
import { createStackNavigator } from '@react-navigation/stack';
import ItemDetails from '../src/screens/SiteManager/Item/ItemDetails';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function MainNavigation() {
  
  const dispatch = useDispatch()

  // before develop your part uncomment other routes except your
  // let userName:string | null = useSelector((state:UserState)=> state.userName)
  // let userType:string | null = useSelector((state:UserState)=> state.userType)
  // let isLoading:boolean = useSelector((state:UserState)=> state.isLoading)
 
let userName: string | null = useSelector((state: { user: UserState }) => state.user.userName);
let userType: string | null = useSelector((state: { user: UserState }) => state.user.userType);
let isLoading: boolean = useSelector((state: { user: UserState }) => state.user.isLoading);

  // this the are you can crate mock user
  // userName = 'hello'
  // userType = 'procurement_staff'
  // isLoading = false

  if(!userType && !userName){
    return <LogIn/>
  }

  if (userType === 'site_manager') {
    // Render Site Manager route/component
    return (
      <NavigationContainer>
        <SiteManagerRoute />
      </NavigationContainer>
    );
  } else if (userType === 'manager') {
    // Render The Manager route/component
    return (
      <NavigationContainer>
        <TheManagerRoute />
      </NavigationContainer>
    );
  } else if (userType === 'supplier') {
    // Render Supplier route/component
    return (
      <NavigationContainer>
        <SupplierRoute />
      </NavigationContainer>
    );
  } else if (userType === 'procurement_staff') {
    // Render Procurement Staff route/component
    return (
      <NavigationContainer>
        <ProcurementStaff />
      </NavigationContainer>
    );
  } else {
    // Handle other cases or unknown user types here
    return <UnknownUserScreen />;
  }
}

function SiteManagerRoute(){
    return(
      <Tab.Navigator initialRouteName='All Items'>
        <Tab.Screen name='All Items' component={ItemsList}/>
        <Tab.Screen name='Orders' component={OrderList}/>
        <Tab.Screen name='Draft' component={Draft}/>
        <Tab.Screen name='Item Requests' component={NewItemRequests}/>
      </Tab.Navigator>
    )
}  
// const SiteManager_StackScreens = () => (
//   <Stack.Navigator initialRouteName="ItemsList">
//     <Stack.Screen name="ItemsList" component={ItemsList} />
//     <Stack.Screen name="ItemDetails" component={ItemDetails} />
//   </Stack.Navigator>
// );

function SupplierRoute(){
    return(
      <Tab.Navigator initialRouteName='SupplierProfile'>
        <Tab.Screen name='SupplierProfile' component={SupplierProfile}/>
        <Tab.Screen name='OrderRef' component={OrderRef}/>
      </Tab.Navigator>
    )
}

function TheManagerRoute(){
    return(
      <Tab.Navigator initialRouteName='ViewOrders'>
        <Tab.Screen name='ViewOrders' component={ViewOrders}/>
        <Tab.Screen name='OrderDetails' component={OrderDetails}/>
        <Tab.Screen name='CreatePolicy' component={CreatePolicy}/>
        <Tab.Screen name='PendingOrders' component={PendingOrders}/>
      </Tab.Navigator>
    )
}

function ProcurementStaff(){
    return(
      <Tab.Navigator initialRouteName='OrderView'>
        <Tab.Screen name='OrderView' component={OrderView}/>
        <Tab.Screen name='ItemAdd' component={ItemAdd}/>
        <Tab.Screen name='OrderDetails' component={ProcunentOrderDetails}/>
        <Tab.Screen name='OrderPurchase' component={OrderPurchase}/>
      </Tab.Navigator>
    )
}  
