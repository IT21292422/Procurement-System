import { View, Platform, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, Card, Text, TextInput, HelperText } from 'react-native-paper'
//React Native Paper is used as a facade design pattern through out the application as an abstraction that provides
//a simplified interface to the library, this library offer components with built-in features and functionalities 

import { Policy } from '../../../config/interfaces'
import { addPolicy } from './PolicyController'

export default function CreatePolicy() {
  const [policyName,setPolicyName] = useState("")

  const [amount,setAmount] = useState("")
  const [description,setDescription] = useState("")
  const [showInputErrror, setShowInputError] = useState(false)
  const [showNumberErrror, setShowNumberError] = useState(false)

  //Policy object to pass to addPolicy function
  const policy: Policy = {
    policyName,
    policyAmount: +amount,
    description
  }
  let numbers = /^[0-9]+$/; 

  const createPolicy = () => {
    //Form validation part to check whether all input fields are not empty and amount is of number type
    if(policyName==="" && amount==="" && description===""){
      setShowInputError(true)
    }else if(!amount.match(numbers)){
      setShowNumberError(true)
    }else{
      //call addPolicy function of firebase and send the policy object as the parameter
      addPolicy(policy)
      setPolicyName("")
      //setItemName("")
      setAmount("")
      setDescription("")
    }
  }

  return (
    <View style={styles.container}>
    <Card style={styles.form}>
    <Card.Content>
      <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>Create New Policy</Text>
      <TextInput
      mode='outlined'
      label="Policy Name"
      style={styles.input}
      value={policyName}
      onChangeText={name => setPolicyName(name)}
      />
      {/* <TextInput
      mode='outlined'
      label="Item Name"
      style={styles.input}
      value={itemName}
      onChangeText={item => setItemName(item)}
      /> */}
      <TextInput
      mode='outlined'
      label="Amount"
      keyboardType='numeric'
      style={styles.input}
      value={amount}
      onChangeText={amount => setAmount(amount)}
      />
      <HelperText type="error" style={{marginTop:-12}} visible={showNumberErrror}>
        Amount needs to be a number
      </HelperText>
      <TextInput
      mode='outlined'
      label="Description"
      multiline={true}
      style={styles.input}
      value={description}
      onChangeText={description => setDescription(description)}
      />
      </Card.Content>
    <Card.Actions>
    <HelperText type="error" style={{marginLeft:5}} visible={showInputErrror}>
      Input Elements Cannot Be Empty
    </HelperText>
      <Button mode='contained' onPress={createPolicy}>Submit</Button>
    </Card.Actions>
  </Card>
  </View>
  )
}   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  form:{
    width: Platform.OS === 'android' ? '90%' : '50%',
    marginBottom: 20,
    marginTop: 20
  },
  input:{
    marginBottom:20,
    width: '100%',
  }
})