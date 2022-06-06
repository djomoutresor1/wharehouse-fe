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



export interface UserRegisterModelStepThree {
  dateOfBirth: string;
  phoneNumber:any;
  country:string
}
