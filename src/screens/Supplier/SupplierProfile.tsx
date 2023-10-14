import { View } from 'react-native'
import React, { useState } from 'react'
import { Surface, Text, SegmentedButtons, Avatar, Card, Button } from 'react-native-paper';
import { StyleSheet, SafeAreaView } from 'react-native';


export default function SupplierProfile()
{
  const [value, setValue] = useState('');
  const [showItems, setShowItems] = useState(false)
  const [showOrders, setShowOrders] = useState(true)


  // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

  const handleItemPress = () =>
  {

  }


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
              onPress: () => setShowOrders(true),
            },
            {
              value: 'itemClicked',
              label: 'Items',
              onPress: () => setShowItems(true),
            }
          ]}
        />
      </SafeAreaView>

      <Card onPress={handleItemPress}>
        <Card.Title title="Card Title" subtitle="Card Subtitle" />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
        <Card.Cover source={{ uri: require("./bricks.jpg"), width: 500 }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
      <Surface elevation={1}>
        <Text>Surface</Text>
      </Surface>
      <View>
        <Text>SupplierProfile</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
  },
});