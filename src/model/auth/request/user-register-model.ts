export interface UserRegisterModel {
  fullname: string;
  username: string;
  email: string;
  password?: string;
  role: string[];
  active?: boolean;
  lastLogin?: string;
  userId?: string;
}
export interface UserRegisterStepThreeModel {
  dateOfBirth: string;
  phoneNumber: string;
  country: string;
}
