import { ResponseAddressModel } from "./response-address-model";
import { ResponseContactModel } from "./response-contact-model";
import { ResponseUserInfoModel } from "./response-user-info-model";

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
  dateOfBirth: string;
  phoneNumber: number;
  country: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  userInfo: ResponseUserInfoModel;
  address: ResponseAddressModel;
  contact: ResponseContactModel;
}
