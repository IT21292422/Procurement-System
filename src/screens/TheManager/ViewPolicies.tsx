import { View, Platform, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Button, Card, Text } from 'react-native-paper'

import { Policy } from '../../../config/interfaces'

export default function ViewPolicies() {

  //const [policies,setPolicies] = useState<Policy[]>([]);

  const data= [
    {
      policyName:"Standard Delivery Policy",
      itemName:["Cement","Bricks","Blocks"],
      policyAmount:150000,
      description:"The items specified can be approved if the Maximum Amount is Less than Rs.100,000/="
    },
    {
      policyName:"Truck Delivery Policy",
      itemName:["Sand","Metal Gravel"],
      policyAmount:200000,
      description:"The items specified can be approved if the Maximum Amount is Less than Rs.200,000/="
    },
  ]

  const renderPolicies = data.map((policy,index) => {

    return (
      <Card key={index} mode='elevated' style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={{fontWeight:'bold'}}>{policy.policyName}</Text>
        </Card.Content>
        <Card.Content>
          <Text style={{fontWeight:'bold'}}>
            Item Name:&nbsp;
          <Text variant="bodyMedium">{policy.itemName}</Text>
          </Text>
          <Text style={{fontWeight:'bold'}}>
            Policy Amount:&nbsp;
          <Text variant="bodyMedium">{policy.policyAmount}</Text>
          </Text>
          <Text style={{fontWeight:'bold'}}>
            Description:&nbsp;
          <Text variant="bodyMedium">{policy.description}</Text>
          </Text>         
        </Card.Content>
        <Card.Actions>
          <Button>Update</Button>
          <Button>Delete</Button>
        </Card.Actions>
      </Card>
    )
  })

    return (
            <ScrollView style={styles.scrollview}>
              <View style={styles.container}>
                {renderPolicies}
              </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
      width: Platform.OS === 'android' ? '90%' : '50%',
      marginBottom: 20,
      marginTop: 20
    },
    cardCover:{
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

