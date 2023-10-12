export interface UserState {
  userName: string | null;
  isLoading: boolean;
  userType: string | null;
}

export interface Policy{
  policyName: string,
  itemName: string,
  policyAmount: number,
  description: string
}