import React, { useState } from 'react'
import { Avatar, TextInput, Card, Text, Button, Modal, Portal } from 'react-native-paper'
import { requestNewItemSupplier } from '../../../utils/dbFunctions'
import { FlatList, View, StyleSheet } from 'react-native'
import { ChildComponentProps } from '../../../config/interfaces';
import { useForm, Controller } from "react-hook-form";

export const ItemUpdateForm = ({ cancelUpdate }: ChildComponentProps) =>
{
    // form hook initialization
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            itemName: '',
            description: '',
            unitPrice: 0,
        }
    });

    const LeftContent = props => <Avatar.Icon {...props} icon="clipboard-plus" />
    const [visible, setVisible] = useState(false)
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemUnitPrice, setItemUnitPrice] = useState('');

    const [unitPriceNumber, setUnitPriceNumber] = useState(parseFloat(itemUnitPrice));
    const unitPriceNumber2 = parseFloat(itemUnitPrice);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const handleItemAdd = async () => {
        const result: any = await requestNewItemSupplier;
        if (result.status) {
            console.log('Item addition successful');
        } else {
            console.log('Item addition was not successful please try again');
        }
    }

    return (
        <>
            <Card>
                <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
                <Card.Content>
                    <Text variant="titleLarge">Add Item</Text>
                    <View style={styles.inputs}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    label='Item Name'
                                    value={itemName}
                                    mode='outlined'
                                    onChangeText={name => setItemName(name)}
                                />
                            )}
                            name="itemName" />
                        {errors.itemName && <Text>This is required.</Text>}

                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    label='Item Description'
                                    value={itemDescription}
                                    mode='outlined'
                                    onChangeText={name => setItemDescription(name)}
                                />
                            )}
                            name="description" />
                        {errors.description && <Text>This is required.</Text>}

                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    label='Unit Price'
                                    value={itemUnitPrice}
                                    mode='outlined'
                                    keyboardType='numeric'
                                    maxLength={7}
                                    onChangeText={amount => 
                                    {
                                        setItemUnitPrice(amount)
                                        setUnitPriceNumber(parseFloat(amount))
                                    }
                                    }
                                />
                            )}
                            name="unitPrice"
                        />
                    </View>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={cancelUpdate}>Cancel</Button>
                    <Button onPress={handleSubmit(handleItemAdd)}>Ok</Button>
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