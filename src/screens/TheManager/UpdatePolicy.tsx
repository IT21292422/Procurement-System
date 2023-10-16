import { View, Platform, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card, Text, TextInput, HelperText } from 'react-native-paper'

import { Policy } from '../../../config/interfaces'
import { getPolicyById, updatePolicy } from './PolicyController'

//This component is used to update the policy
export default function UpdatePolicy(id:any) {
    const [policyName,setPolicyName] = useState("")
    const [amount,setAmount] = useState("")
    const [description,setDescription] = useState("")
    const [showInputErrror, setShowInputError] = useState(false)
    const [showNumberErrror, setShowNumberError] = useState(false)

    //Th policy object to pass to the updatePolicy function
    const policy: Policy = {
        policyName,
        policyAmount: +amount,
        description
      }
      let numbers = /^[0-9]+$/;
    
    //This function is used to retrieve the policy based on the id and it sets the state of the respective ones
    const getPolicy = async () => {
      try{
        const newData: any = await getPolicyById(id)
        console.log(newData)
        setPolicyName(newData.policyName)
        //setItemName(newData.itemName)
        setAmount(newData.policyAmount)
        setDescription(newData.description)
      }catch(error){
        console.log("Error retrieving policy: ",error)
      }
    }

    //This calls the getPolicy function only once when the compoennt is rendered
    useEffect(() => {
      getPolicy();
    }, []);

    //This is the function to update the policy, it has some valdiations to check whether input fields are not empty
    //and also the amount is of number type
      const updtPolicy = () => {
        if(policyName==="" && amount==="" && description===""){
          setShowInputError(true)
        }else if(!amount.match(numbers)){
          setShowNumberError(true)
        }else{
          updatePolicy(id,policy)
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
          <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>Update Policy</Text>
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
          <Button mode='contained' onPress={updtPolicy}>Update</Button>
        </Card.Actions>
      </Card>
      </View>
    );
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

