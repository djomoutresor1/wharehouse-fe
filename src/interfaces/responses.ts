export interface PositionTable {
  A: number;
  B: number;
  C: number;
}

export interface responseProfil {
  active?: boolean;
  dateOfBirth?: string;
  email?: string;
  fullname?: string;
  lastLogin?: string;
  roles?: role[];
  userId?: string;
  username?: string;
  gender?:string;
  phoneNumber?:number
}

export interface role {
  name: string;
}
