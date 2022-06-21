export interface ResponseLoginModel {
  fullname: string;
  userId: string;
  active:boolean;
  message: string;
  type?: string;
  token: string;
  refreshToken: string;
  username: string;
  email: string;
  roles: string[];
  gender: string;
  dateOfBirth: Date;
  phoneNumber: number;
  country: string;
  lastLogin: string;
  createdAt: string;
}
