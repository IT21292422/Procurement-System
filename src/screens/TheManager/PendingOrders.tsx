import { View, Platform, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Button, Card, Text } from 'react-native-paper'

const orders = [
  {
    title: "Cement",
    orderId: "ORD-1124",
    orderImage: require("../../../public/cement.jpeg"),
    quantity: "1 Ton",
    status: "Pending",
    supplier: "Expo Supplier",
    date: "5/12/2023"
  },
  {
    title: "Bricks",
    orderId: "ORD-1124",
    orderImage: require("../../../public/bricks.jpg"),
    quantity: "1 Ton",
    status: "Completed",
    supplier: "Expo Supplier",
    date: "5/12/2023"
  },
  {
    title: "Iron Rod",
    orderId: "ORD-1124",
    orderImage: require("../../../public/ironrods.jpg"),
    quantity: "1 Ton",
    status: "Pending",
    supplier: "Expo Supplier",
    date: "5/12/2023"
  },
  {
    title: "Gravel Metal",
    orderId: "ORD-1124",
    orderImage: require("../../../public/metal.jpeg"),
    quantity: "1 Ton",
    status: "Completed",
    supplier: "Expo Supplier",
    date: "5/12/2023"
  },

]

export default function PendingOrders() {

  const renderOrder = orders.map((order, index) => {

    const orderStatus: any = () => {
      if (order.status === 'Pending') {
        return {
          textAlign: 'right', color: 'blue', fontWeight: "600", textShadowColor: 'black'
        }
      } else if (order.status === 'Completed') {
        return {
          textAlign: 'right', color: 'green', fontWeight: "600"
        }
      }
    }

    if (order.status === 'Pending') {
      return (
        <Card key={index} mode='elevated' style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>{order.title}</Text>
            <Text variant="bodyMedium">{order.orderId}</Text>
          </Card.Content>
          <Card.Cover style={styles.cardCover} resizeMode='contain' source={order.orderImage} />
          <Card.Content>
            <Text variant="titleLarge" style={orderStatus()}>{order.status}</Text>
            <Text style={{ fontWeight: 'bold' }}>
              Quantity:&nbsp;
              <Text variant="bodyMedium">{order.quantity}</Text>
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              Supplier:&nbsp;
              <Text variant="bodyMedium">{order.supplier}</Text>
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              Date To Receive:&nbsp;
              <Text variant="bodyMedium">{order.date}</Text>
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
      )
    }
  })

  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.container}>
        {renderOrder}
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  card: {
    width: Platform.OS === 'android' ? '90%' : '50%',
    marginBottom: 20,
    marginTop: 20
  },
  cardCover: {
    width: '100%',
    aspectRatio: 16 / 9,
    alignSelf: 'center'
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
  }
})