import { Timestamp } from 'firebase/firestore';

export type ItemType = {
	itemId: 		 string;
	itemName:		 string;
	description: string;
	unitPrice: 	 number;
	policy:			 string;
}

export type OrderType = {
	orderId: 			string,
	isDraft: 			boolean,
	itemId: 			string,
	itemName: 		string,
	quantity: 		number,
	status: 			string,
	orderTotal: 	number,
	createdAt: 		Timestamp,
	purchaseDate: Timestamp,
	supplierId: 	string
}