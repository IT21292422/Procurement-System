import { View, Platform, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card, Text, Dialog, Portal } from 'react-native-paper'

import { Policy } from '../../../config/interfaces'
import { deletePolicy, getPolicies } from './PolicyController';

export default function ViewPolicies() {

  const [policies, setPolicies] = useState<Policy[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedPolicyId,setSlectedPolicyId] = useState<string | null>(null);

  const showDialog = (id:any) =>{
    setSlectedPolicyId(id);
    setVisible(true);
  } ;
  const hideDialog = () => {
    setSlectedPolicyId(null);
    setVisible(false);
  };

  const data = [
    {
      policyName: "Standard Delivery Policy",
      itemName: "Cement, Bricks,Blocks",
      policyAmount: 150000,
      description: "The items specified can be approved if the Maximum Amount is Less than Rs.100,000/="
    },
    {
      policyName: "Express Delivery Policy",
      itemName: "Cement, Brick, Blocks",
      policyAmount: 150000,
      description: "The items specified can be approved if the Maximum Amount is Less than Rs.100,000/="
    },
    {
      policyName: "Overnight Delivery Policy",
      itemName: "Sand, Metal, Gravel",
      policyAmount: 200000,
      description: "The items specified can be approved for overnight delivery for urgent orders which are required the next day, if the Maximum Amount is Less than Rs.200,000/="
    },
    {
      policyName: "Overnight Delivery Policy",
      itemName: "Sand, Metal, Gravel",
      policyAmount: 200000,
      description: "The items specified can be approved for overnight delivery for urgent orders which are required the next day, if the Maximum Amount is Less than Rs.200,000/="
    },
    {
      policyName: "Overnight Delivery Policy",
      itemName: "Sand, Metal, Gravel",
      policyAmount: 200000,
      description: "The items specified can be approved for overnight delivery for urgent orders which are required the next day, if the Maximum Amount is Less than Rs.200,000/="
    },
  ]

  async function receiveData() {
    const newData: Policy[] = await getPolicies()
    setPolicies(newData)
  }

  const deleteData = async () => {
    if(selectedPolicyId){
      try {
        await deletePolicy(selectedPolicyId);
        hideDialog();
        receiveData(); // Refresh the list of policies after deleting one
      } catch (error) {
        console.log("Error deleting policy: ", error)
      }
    }
  }

  useEffect(() => {
    receiveData()
  }, [policies])

  const renderPolicies = policies.map((policy, index) => {

    return (
      <>
        <Card key={index} mode='elevated' style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>{policy.policyName}</Text>
          </Card.Content>
          <Card.Content>
            {/* <Text style={{ fontWeight: 'bold' }}>
              Item Name:&nbsp;
              <Text variant="bodyMedium">{policy.itemName}</Text>
            </Text> */}
            <Text style={{ fontWeight: 'bold' }}>
              Policy Amount:&nbsp;
              <Text variant="bodyMedium">{policy.policyAmount}</Text>
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              Description:&nbsp;
              <Text variant="bodyMedium">{policy.description}</Text>
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button>Update</Button>
            <Button onPress={() => showDialog(policy.id)}>Delete</Button>
          </Card.Actions>
        </Card>
      </>
    )
  })

  return (
    <>
      <Button mode="contained-tonal" style={styles.btn}>Add Policy</Button>
      <ScrollView style={styles.scrollview}>
        <View style={styles.container}>
          {renderPolicies}
        </View>
      </ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure to Delete this policy</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: Platform.OS === 'android' ? 'relative' : 'absolute',
    width: 200,
    top: 20,
    right: 30
  },
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

