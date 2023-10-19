export interface UserState {
  userName: string | null;
  isLoading: boolean;
  userType: string | null;
}

export interface itemInterface {
  itemId: string;
  itemName: string;
  description: string;
  unit: string;
  unitPrice: number;
  policyName: string;
  id?: string;
}

export interface newItem {
  description: string;
  isApproved: boolean;
  itemName: string;
  unitPrice: number;
}

export interface existingItem{
  description: string;
  itemName: string;
  unitPrice: number;
  policyName: string;
  unit: string;
}
export interface supplierInterface {
  supplierId: string;
  supplierName: string;
  userEmail: string;
}
export interface orderInterface {
  orderId: string;
  isDraft: boolean;
  itemList: [{ itemName: string; unitPrice: number; quantity: number }]; // an array of Maps
  orderTotal: number;
  deliverySite: string; // site name
  status: string; // approval_pending | approved | delivery_pending | delivered ...
  createdAt: Date;
  purchaseDate: Date; // procurement
  supplierName: string;
  estimatedDeliveryDate: Date; //delivery date for order
  id?:string;
}

export interface orderItemsinterface{
itemName: string; 
  unitPrice: number; 
  quantity: number
}
export interface newItemRequestInterface {
  itemName: string;
  description: string;
  unitPrice?: number;
}

export interface ChildComponentProps {
  cancelUpdate: () => void;
  }

export interface Logings{
  email:string,
  password:string
}

export interface LoginResponse {
  userType: string | null;
  error: string | null;
}

export interface Items{
  itemName: string;
  unitPrice: number;
  quantity: number;
}

export interface IRequestedItems{
  description:string;
  isApproved:boolean;
  itemName:string;
}

export interface IUser{
  userEmail:string;
  userType:string;
}

export interface IItem {
  orderId: string;
  itemId: string;
  itemName: string;
  description: string;
  unit: string;
  unitPrice: number;
  policyName: string;
}

export interface Policy{
  id?: string;
  policyName: string;
  policyAmount: number;
  description: string;

}

export interface IsupplierItemRequest {
  description:string;
  isApproved:boolean;
  itemName:string;
  unitPrice:number;
}