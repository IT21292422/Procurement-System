import { View, Platform, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card, Text, Dialog, Portal, Modal } from 'react-native-paper'
//React Native Paper is used as a facade design pattern through out the application as an abstraction that provides
//a simplified interface to the library, this library offer components with built-in features and functionalities 

import { Policy } from '../../../config/interfaces'
import { deletePolicy, getPolicies } from './PolicyController';
import CreatePolicy from './CreatePolicy';
import UpdatePolicy from './UpdatePolicy';


//This function renders all the policies
export default function ViewPolicies() {

  const [policies, setPolicies] = useState<Policy[]>([]);
  const [visible, setVisible] = useState(false);
  const [visibleModalCreate, setVisibleModalCreate] = useState(false);
  const [visibleModalUpdate, setVisibleModalUpdate] = useState(false);
  const [selectedPolicyId, setSlectedPolicyId] = useState<string | null>(null);

  const showModalCreate = () => {
    setVisibleModalCreate(true);
  }

  const showModalUpdate = (id:any) => {
    setSlectedPolicyId(id);
    setVisibleModalUpdate(true);
  }

  const hideModalCreate = () => {
    setVisibleModalCreate(false);
  }

  const hideModalUpdate = () => {
    setVisibleModalUpdate(false);
  }

  const showDialog = (id: any) => {
    setSlectedPolicyId(id);
    setVisible(true);
  };
  const hideDialog = () => {
    setSlectedPolicyId(null);
    setVisible(false);
  };

  //This displays the modal to update a policy
  const updatePolicyModal = (
    <Portal>
      <Modal visible={visibleModalUpdate} onDismiss={hideModalUpdate} contentContainerStyle={styles.containerStyle}>
        <UpdatePolicy id={selectedPolicyId}/>
      </Modal>
    </Portal>
  );

  //This function retrieves all policy from the database and set to the newData state
  async function receiveData() {
    const newData: Policy[] = await getPolicies()
    setPolicies(newData)
  }

  //This function deletes a policy based on the id
  const deleteData = async () => {
    if (selectedPolicyId) {
      try {
        await deletePolicy(selectedPolicyId);
        hideDialog();
        receiveData(); // Refresh the list of policies after deleting one
      } catch (error) {
        console.log("Error deleting policy: ", error)
      }
    }
  }

  //Observer design pattern is used here, this calls the recieve data function and at the same time oberves the 
  //policies state for any changes and if there are any changes, this will re-render the component 
  useEffect(() => {
    receiveData()
  }, [policies])

  //Iterator design pattern is used here to traverse through the array
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
            <Button onPress={() => showModalUpdate(policy.id)}>Update</Button>
            <Button onPress={() => showDialog(policy.id)}>Delete</Button>
          </Card.Actions>
        </Card>
      </>
    )
  })

  return (
    <>
      <ScrollView style={styles.scrollview}>
        <View style={styles.btnContainer}>
        <Button mode="contained-tonal" style={styles.btn} onPress={showModalCreate}>Add Policy</Button>
        </View>
        <View style={styles.container}>
          {renderPolicies}
        </View>
      </ScrollView>
      {updatePolicyModal}
      <Portal>
        <Modal visible={visibleModalCreate} onDismiss={hideModalCreate} contentContainerStyle={styles.containerStyle}>
          <CreatePolicy/>
        </Modal>
      </Portal>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyLarge">Are you sure you want to Delete this policy?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={deleteData}>Confirm</Button>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 200,
  },
  btnContainer:{
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'flex-end', // Right-align content
    marginTop:20,
    paddingRight: 20, 
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
  containerStyle: {
    width: '100%',
    height:'80%',
    backgroundColor: 'white',
    //padding: 20,
    //alignItems:'center',
    marginLeft:'auto',
    marginRight:'auto'
  },
  dialog:{
    width:'30%',
    marginLeft:'auto',
    marginRight:'auto'
  },
  scrollview: {
    minHeight: '100%'
  }
})

