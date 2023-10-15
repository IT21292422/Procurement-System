import React, { useState } from 'react'
import { Avatar, TextInput, Card, Text, Button, Modal, Portal } from 'react-native-paper'
import { requestNewItemSupplier } from '../../../utils/dbFunctions'
import { FlatList, View, StyleSheet } from 'react-native'
import { ChildComponentProps } from '../../../config/interfaces';


export const ItemUpdateForm = ({cancelUpdate} :  ChildComponentProps) =>
{

    const LeftContent = props => <Avatar.Icon {...props} icon="clipboard-plus" />
    const [visible, setVisible] = useState(false)
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemUnitPrice, setItemUnitPrice] = useState('');

    const [unitPriceNumber, setUnitPriceNumber] = useState(parseFloat(itemUnitPrice));
    const unitPriceNumber2 = parseFloat(itemUnitPrice);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <>
            <Card>
                <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
                <Card.Content>
                    <Text variant="titleLarge">Update Item</Text>
                    <View style={styles.inputs}>
                        <TextInput
                            label='Item Name'
                            value={itemName}
                            mode='outlined'
                            onChangeText={name => setItemName(name)}
                        />
                        <TextInput
                            label='Item Description'
                            value={itemDescription}
                            mode='outlined'
                            onChangeText={name => setItemDescription(name)}
                        />
                        <TextInput
                            label='Unit Price'
                            value={itemUnitPrice}
                            mode='outlined'
                            keyboardType='numeric'
                            maxLength={10}
                            onChangeText={amount => 
                            {
                                setItemUnitPrice(amount)
                                setUnitPriceNumber(parseFloat(amount))
                            }
                            }
                        />
                    </View>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={cancelUpdate}>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions>
            </Card>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalStyle: {
        backgroundColor: 'white', padding: 20
    },
    inputs: {
        marginVertical: 3
    }

});