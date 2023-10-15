import { FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Surface, Text, SegmentedButtons, Avatar, Card, Button } from 'react-native-paper';
import { StyleSheet, SafeAreaView } from 'react-native';
import { doc } from 'firebase/firestore';
import { fireStore } from '../../../config/firebase';
import { addItem, getAllItems } from '../../../utils/dbFunctions';
import { itemInterface } from '../../../config/interfaces';

export default function SupplierProfile()
{
  const [value, setValue] = useState('');
  const [showItems, setShowItems] = useState(false)
  const [showOrders, setShowOrders] = useState(true)
  const [supplierItems, setSupplierItems] = useState<itemInterface[]>([]);


  // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

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
          itemsArray.push({id: doc.id, ...doc.data()});
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


  const handleItemPress = () =>
  {

  }


  const docRef = doc(fireStore, "items", "SF");


  return (
    <>
      <SafeAreaView style={styles.container}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'orderClicked',
              label: 'Order',
              onPress: () =>
              {
                setShowOrders(true)
                setShowItems(false)
              },
            },
            {
              value: 'itemClicked',
              label: 'Items',
              onPress: () =>
              {
                setShowItems(true)
                setShowOrders(false)
                console.log(supplierItems)
              },
            }
          ]}
        />
      </SafeAreaView>
        
      {showItems && !supplierItems &&
      <Button loading={true}>Loading</Button>}  
      {showItems && supplierItems &&
        <FlatList
          data={supplierItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card onPress={handleItemPress} style={styles.container}>
              {/* <Card.Title title={item.itemName} subtitle="Card Subtitle" /> */}
              <Card.Content>
                <Text variant="titleLarge">{item.itemName}</Text>
                <Text variant="bodyMedium">Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit, sed do eiusmod tempor incididunt ut 
                labore et dolore magna aliqua. Ut enim ad minim veniam</Text>
              </Card.Content>
              <Card.Cover style={styles.imageHolder} source={{ uri: require("../../../public/bricks.jpg") }} />
              <Card.Actions>
                <Button>Delete</Button>
                <Button>Update</Button>
              </Card.Actions>
            </Card>
          )}
        />}

      <Surface elevation={1}>
        <Text>Surface</Text>
      </Surface>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    marginVertical: 5,
    marginHorizontal:1,
  },
  imageHolder: {
    marginHorizontal:20,
  }
});