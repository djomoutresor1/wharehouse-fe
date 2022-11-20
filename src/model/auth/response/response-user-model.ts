import { ResponseAddressModel } from './response-address-model';
import { ResponseContactModel } from './response-contact-model';
import { ResponseFileModel } from './response-file-model';
import { ResponseUserInfoModel } from './response-user-info-model';

export interface ResponseUserModel {
  userId: string;
  fullname: string;
  gender: string;
  username: string;
  email: string;
  emailPec: string;
  roles: string[];
  active: boolean;
  lastLogin: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  userInfo: ResponseUserInfoModel;
  address: ResponseAddressModel;
  contact: ResponseContactModel;
  profileImage: ResponseFileModel[];
}
