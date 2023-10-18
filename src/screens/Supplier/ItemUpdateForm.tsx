import React, { useEffect, useState } from 'react'
import { Avatar, TextInput, Card, Text, Button, Modal, Portal } from 'react-native-paper'
import { requestNewItemSupplier, getItemById, updateItem } from '../../../utils/dbFunctions'
import { FlatList, View, StyleSheet } from 'react-native'
import { ChildComponentProps, existingItem } from '../../../config/interfaces';
import { useForm, Controller } from "react-hook-form";
import { newItemRequestInterface } from "../../../config/interfaces";

export const ItemUpdateForm = ({ id, cancelUpdate, refreshScreen }: { id?: string; cancelUpdate: () => void; refreshScreen: ()=> void }) =>
{
    const LeftContent = props => <Avatar.Icon {...props} icon="clipboard-plus" />
    const [visible, setVisible] = useState(false)
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemUnitPrice, setItemUnitPrice] = useState('');

    const [unitPriceNumber, setUnitPriceNumber] = useState(parseFloat(itemUnitPrice));
    const unitPriceNumber2 = parseFloat(itemUnitPrice);
    const [itemData, setItemData] = useState<existingItem | boolean>();
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    // form hook initialization
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            itemName: '',
            description: '',
            unitPrice: '',
        }
    });

    useEffect(() => {
      console.log("Fetchind data for", id);
      const loadData = async ()=>{
        const result = await getItemById(id);
        if (result) {
            setItemData(result)
            console.log("single item data", result);
            
        } else{
            console.log("No data or something went wrong");
            
        }
      }
      loadData();
    }, [id])
    



    const handleItemAdd: any = async (data: newItemRequestInterface) => {
        const result: any = await requestNewItemSupplier({isApproved: false,unitPrice: 0, ...data});
        if (result) {
            refreshScreen()
            console.log('Item addition successful');
            cancelUpdate();
        } else {
            console.log('Item addition was not successful please try again');
        }
    }

    const handleItemUpdate: any = async (data: existingItem) =>{
        console.log('updatinf data of doc', id);
        const result = updateItem(id!, data)
        if (result) {
            refreshScreen()
            console.log('successfully updated data');
            cancelUpdate();
        }
    }

    return (
        <>
        { !id && <Card>
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
                                    value={value}
                                    mode='outlined'
                                    onChangeText={onChange}
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
                                    value={value}
                                    mode='outlined'
                                    onChangeText={onChange}
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
                                    value={value}
                                    mode='outlined'
                                    keyboardType='numeric'
                                    maxLength={7}
                                    onChangeText={onChange}
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
            </Card>}


            {id && <Card>
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
                                    value={value}
                                    placeholder={itemData?.itemName}
                                    mode='outlined'
                                    onChangeText={onChange}
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
                                    value={value}
                                    placeholder={itemData?.description}
                                    mode='outlined'
                                    onChangeText={onChange}
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
                                    value={value}
                                    mode='outlined'
                                    placeholder={itemData?.unitPrice}
                                    keyboardType='numeric'
                                    maxLength={7}
                                    onChangeText={onChange}
                                />
                            )}
                            name="unitPrice"
                        />
                    </View>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={cancelUpdate}>Cancel</Button>
                    <Button onPress={handleSubmit(handleItemUpdate)}>Ok</Button>
                </Card.Actions>
            </Card>}
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