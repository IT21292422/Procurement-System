export interface UserState {
  userName: string | null;
  isLoading: boolean;
  userType: string | null;
}
export interface itemInterface {
  itemId: "string";
  itemName: "string";
  description: "string";
  unit: "string";
  unitPrice: "number";
  policyName: "string";
}

export interface newItem {
  description: string;
  isApproved: boolean;
  itemName: string;
}
export interface supplierInterface {
  supplierId: "string";
  supplierName: "string";
  userEmail: "string";
}
export interface orderInterface {
  orderId: "string";
  isDraft: "boolean";
  itemList: [{ itemName: "string"; unitPrice: "number"; quantity: "number" }]; // an array of Maps
  orderTotal: "number";
  deliverySite: "string"; // site name
  status: "string"; // approval_pending | approved | delivery_pending | delivered ...
  createdAt: "timestamp";
  purchaseDate: "timestamp"; // procurement
  supplierName: "string";
  estimatedDeliveryDate: "timestamp"; //delivery date for order
}
export interface newItemRequestInterface {
  itemName: "string";
  description: "string";
  isApproved: "boolean";
}
