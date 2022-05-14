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



export interface UserRegisterModelStepTwo {
  dateOfBirth?: string;
  phoneNumber?:number;
  country?:string
}
