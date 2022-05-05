export interface UserRegisterModel {
  fullname: string;
  username: string;
  email: string;
  password?: string;
  role: string[];
  active?: boolean;
  dateOfBirth?: string;
  lastLogin?: string;
  userId?: string;
}
