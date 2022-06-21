import { UserAddressModel } from "./user-address-model";
import { UserContactModel } from "./user-contact-model";

export interface UserInsertModel {
  userId?: string;
  gender: string;
  fullname: string;
  username: string;
  email: string;
  secondEmail: string;
  role: string[];
  address: UserAddressModel;
  contact: UserContactModel;
  dateOfBirth: string;
}
