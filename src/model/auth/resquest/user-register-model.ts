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

export interface UserUpdateModel {
  fullname: string,
  username: string,
  email: string,
  emailPec: string,
  dateOfBirth: string,
  country: string,
  state: string,
  address: string,
  zipCode: string,
  landlinePrefix: string,
  phoneNumber: string,
  landlineNumber: string,
  role: string[],
  gender: string,
}
