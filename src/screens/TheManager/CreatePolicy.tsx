import { View, Platform, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Button, Card, Text } from 'react-native-paper'

export default function CreatePolicy() {
  return (
    <Card style={styles.form}>
    <Card.Content>
      <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>Title</Text>
      <Text variant="bodyMedium">Body</Text>
    </Card.Content>
    
    <Card.Content>

    </Card.Content>
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
  )
}   
const styles = StyleSheet.create({
  form:{
    flex: 1
  }
})