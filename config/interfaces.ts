export interface UserState {
  userName: string | null;
  isLoading: boolean;
  userType: string | null;
}

export interface Policy{
  id?: string,
  policyName: string,
  policyAmount: number,
  description: string
}