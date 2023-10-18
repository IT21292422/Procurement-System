import { FlatList, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Surface, Text, SegmentedButtons, Avatar, Card, Button, Divider, FAB, Appbar, useTheme } from 'react-native-paper';
import { StyleSheet, SafeAreaView } from 'react-native';
import { doc } from 'firebase/firestore';
import { fireStore } from '../../../config/firebase';
import { requestNewItemSupplier, getAllItems, getAllItemRequests, deleteItemRequest, deleteItem } from '../../../utils/dbFunctions';
import { itemInterface,UserState } from '../../../config/interfaces';
import { ItemUpdateForm } from './ItemUpdateForm';
import { setUserType,logOut,logUser,setLoading } from '../../../features/user/userSlice';
import { useSelector,useDispatch } from 'react-redux';


export default function SupplierProfile()
{
  const [value, setValue] = useState('');
  const [showItems, setShowItems] = useState(true)
  const [showRequests, setShowRequests] = useState(false)
  const [supplierItems, setSupplierItems] = useState<itemInterface[]>([]);
  const [itemRequests, setItemRequests] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  const logoImage = require('../../../public/sampleCompany.jpg');

  const dispatch = useDispatch()


  useEffect(() =>
  {

    const loadData = async () =>
    {
      try
      {
        const itemsSnapshot: any = await getAllItems();
        const itemsArray: itemInterface[] = [];
        itemsSnapshot.forEach((doc: any) =>
        {
          itemsArray.push({ id: doc.id, ...doc.data() });
        });

        setSupplierItems(itemsArray);
      } catch (error)
      {
        console.log('Error occurred loading data', error);
      }

    }
    loadData()
    console.log(supplierItems);
  }, [])

  const loadItemRequests = async () =>
  {
    try
    {
      const requestSnapshot: any = await getAllItemRequests();
      const requestArray: any = [];
      requestSnapshot.forEach((doc: any) =>
      {
        requestArray.push({ id: doc.id, ...doc.data() })
      });
      setItemRequests(requestArray);
    } catch (error)
    {
      console.log('Error occurred loading item request data', error);
    }
  }

  const handleItemPress = async () =>
  {

  }

  const handleFabPress = () =>
  {
    setShowUpdateForm(true);
    // if (showItems) {
    //   setShowItems(false);
    // }else{
    //   setShowItems(true);
    // }
    console.log('FAB Pressed');
  }

  const handleUpdateCancel = () =>
  {
    setShowUpdateForm(false);
  }
  const handleRequestDelete = async (id: string) =>
  {
    const result = await deleteItemRequest(id)
    if (result)
    {
      console.log('Successfully deleted the request');

    }
  }

  const handleDeleteItem = async (id: string) =>{
    console.log('Deleting the item', id);

    const result = await deleteItem(id);
    if (result)
    {
      console.log('Successfully deleted the item', id);

    }
  }


  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { }} />
        <Image source={logoImage} style={{ width: 40, height: 40, marginEnd: 10 }} />
        <Appbar.Content title="  Test Supplier" />
        <Appbar.Action icon="account" onPress={() => {dispatch(logOut)}} />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'orderClicked',
              label: 'Item requests',
              onPress: () =>
              {
                setShowRequests(true)
                setShowItems(false)
                loadItemRequests()
              },
            },
            {
              value: 'itemClicked',
              label: 'Items',
              onPress: () =>
              {
                setShowItems(true)
                setShowRequests(false)
                console.log(supplierItems)
              },
            }
          ]}
        />
      </SafeAreaView>
      <Divider />
      {showItems && supplierItems.length == 0 &&
        <Button loading={true}>Loading Items</Button>}
      {showItems && showUpdateForm && <ItemUpdateForm cancelUpdate={handleUpdateCancel} />}
      {showItems && supplierItems &&
        <FlatList
          data={supplierItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: any) => (
            <Card onPress={handleItemPress} style={styles.container}>
              {/* <Card.Title title={item.itemName} subtitle="Card Subtitle" /> */}
              <Card.Content>
                <Text variant="titleLarge">{item.itemName}</Text>
                <Text variant="bodyMedium">{item.description}</Text>
              </Card.Content>

              <Card.Actions>
                <Button onPress={() => {handleDeleteItem(item.id)}}>Delete</Button>
                <Button>Update</Button>
              </Card.Actions>
            </Card>
          )}
        />}
      {showRequests && itemRequests.length == 0 &&
        <Button loading={true}>Loading Requests</Button>}
      {showRequests &&
        <FlatList
          data={itemRequests}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: any) => (
            <Card onPress={handleItemPress} style={styles.container}>
              {/* <Card.Title title={item.itemName} subtitle="Card Subtitle" /> */}
              <Card.Content>
                <Text variant="titleLarge">{item.itemName}</Text>
                <Text variant="bodyMedium">{item.description}</Text>
                <Text variant="bodyMedium">{item.unitPrice ? `Unit price: ${item.unitPrice}` : 'Unit Price not set'}</Text>
                <Button style={styles.notApprovedButton}>Pending approval</Button>

              </Card.Content>
              <Card.Cover style={styles.imageHolder} source={require('../../../public/bricks.jpg')} />
              <Card.Actions>
                <Button onPress={() => handleRequestDelete(item.id)}>Delete</Button>
              </Card.Actions>
            </Card>
          )}
        />}
      {showItems && !showUpdateForm && <FAB
        icon="plus"
        style={styles.fab}
        onPress={handleFabPress}
      />}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 1,
  },
  imageHolder: {
    marginHorizontal: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  notApprovedButton: {
    borderBlockColor: "red",
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "coral"
  }
});