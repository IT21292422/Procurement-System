export interface UserState {
  userName: string | null;
  isLoading: boolean;
  userType: string | null;
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