import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  ItemAdd: { orderId: string }; // Assuming itemId is a string
};

export type ItemAddRouteProp = RouteProp<RootStackParamList, 'ItemAdd'>;