import { Timestamp } from 'firebase/firestore';

export type UserType = {
	username:	 string,
	userType:	 string, // site_manager | manager | procurement | supplier 
	userEmail: string
}

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
	orderTotal: 	number,
	deliverySite: string, // site name
	status: 			string, // approval_pending | approved | delivery_pending | delivered ...
	createdAt: 		Timestamp,
	purchaseDate: Timestamp,
	supplierId: 	string
}

export type SiteType = {
	siteId: 	string,
	siteName: string,
	address: 	string
}