import { Timestamp } from 'firebase/firestore';

export type UserType = {
	username:  string,
	userType:  string, // site_manager | manager | procurement | supplier 
	userEmail: string
}

export type ItemType = {
	itemId:      string;
	itemName:    string;
	description: string;
	unitPrice:   number;
	policy:      string;
}

export type OrderType = {
	orderId:      string,
	isDraft:      boolean,
	itemList:     Array<{ itemName: string; unitPrice: number; quantity: number }>,
	orderTotal:   number,
	deliverySite: string, // site name
	status:       string, // approval_pending | approved | delivery_pending | delivered ...
	createdAt:    Timestamp,
	purchaseDate: Timestamp,
	supplierName: string
}

export type SiteType = {
	siteId:   string,
	siteName: string,
	address:  string
}

export type newItemRequestType = {
	itemName:    string;
	description: string;
	isApproved:  boolean
}

export type policy = {
	id:           string;
	policyName:   string;
	threshold:    number; // if total is lower than this it is automatically approved
	description:  string;    
}

export type supplier = {
	supplierId:   string;
	supplierName: string;
}
