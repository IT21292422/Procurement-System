import { View, Text } from 'react-native'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeliveryDetails from '../src/screens/SiteManager/DeliveryDetails';
import Draft from '../src/screens/SiteManager/Draft';
import ItemDetails from '../src/screens/SiteManager/ItemDetails';
import ItemsList from '../src/screens/SiteManager/ItemsList';
import OrderRef from '../src/screens/Supplier/OrderRef';
import SupplierProfile from '../src/screens/Supplier/SupplierProfile';
import CreatePolicy from '../src/screens/TheManager/CreatePolicy';
import OrderDetails from '../src/screens/TheManager/OrderDetails';
import PendingOrders from '../src/screens/TheManager/PendingOrders';
import ViewOrders from '../src/screens/TheManager/ViewOrders';
import ItemAdd from '../src/screens/ProcurementStaff/ItemAdd';
import OrderPurchase from '../src/screens/ProcurementStaff/OrderPurchase';
import OrderView from '../src/screens/ProcurementStaff/OrderView';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function MainNavigation() {
  const dispatch = useDispatch()
  const count:number = useSelector((state:any)=>state.counter.value)
 
  // before develop your part uncomment other routes except your
  return (
    <NavigationContainer>
      {/* <SiteManagerRoute/> */}
      {/* <TheManagerRoute/> */}
      {/* <SupplierRoute/> */}
      <ProcurementStaff/>
    </NavigationContainer>
  )
}

function SiteManagerRoute(){
    return(
      <Tab.Navigator initialRouteName='ItemList'>
        <Tab.Screen name='ItemList' component={ItemsList}/>
        <Tab.Screen name='ItemDetails' component={ItemDetails}/>
        <Tab.Screen name='DeliveryDetails' component={DeliveryDetails}/>
        <Tab.Screen name='Draft' component={Draft}/>
      </Tab.Navigator>
    )
}  

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
        <Tab.Screen name='OrderDetails' component={OrderDetails}/>
        <Tab.Screen name='CreatePolicy' component={CreatePolicy}/>
        <Tab.Screen name='PendingOrders' component={PendingOrders}/>
        <Tab.Screen name='ViewOrders' component={ViewOrders}/>
      </Tab.Navigator>
    )
}

function ProcurementStaff(){
    return(
      <Tab.Navigator initialRouteName='OrderView'>
        <Tab.Screen name='OrderView' component={OrderView}/>
        <Tab.Screen name='ItemAdd' component={ItemAdd}/>
        <Tab.Screen name='OrderDetails' component={OrderDetails}/>
        <Tab.Screen name='OrderPurchase' component={OrderPurchase}/>
      </Tab.Navigator>
    )
}  
