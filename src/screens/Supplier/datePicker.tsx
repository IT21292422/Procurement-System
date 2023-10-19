import React from 'react'
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';


export const DatePickerHook = ({ control, name, value, onChange } : any) => {

    // const { control, handleSubmit, formState: { errors } } = useForm({
    //     defaultValues: {
    //         deestimatedDeliveryDatelivery: undefined
    //     }
    // });

    
    return (
      <Controller
        control={control}
        rules={{
            required: true,
        }}
        render={({ field: { onChange} }) => (
            <DateTimePicker
            value={new Date()} // Provide a default value if value is empty
            mode="date" // You can use "time" or "datetime" for different modes
            is24Hour={true}
            display="default"
            onChange={(event, deliveryDate) => {
                onChange(deliveryDate);
            }}
            />
            )}
            name={name}/>
            
    );
  };


//   {showDeliveryInput && <Controller
//     control={control}
//     rules={{
//       required: true,
//     }}
//     render={({ field: { onChange, onBlur, value } }) => (
//       <>
//         <TextInput

//           label='Delivery'
//           value={value}
//           mode='outlined'
//           onChangeText={onChange}
//         />
//         <DatePicker
//           modal
//           open={openDatePicker}
//           date={deliveryDate}
//           onConfirm={(date) =>
//           {
//             setOpen(false)
//             setDate(date)
//           }}
//           onCancel={() =>
//           {
//             setOpen(false)
//           }}
//         />
//       </>
//     )}
//     name="deliveryDate" />
