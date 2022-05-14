export interface ResponseLoginModel {
  userId: string;
  message: string;
  type?: string;
  token: string;
  refreshToken: string;
  username: string;
  email: string;
  roles: string[];
  gender:string;
  dateOfBirth:Date;
  phoneNumber:number;
  country:string
}
