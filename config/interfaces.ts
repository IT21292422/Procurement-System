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
