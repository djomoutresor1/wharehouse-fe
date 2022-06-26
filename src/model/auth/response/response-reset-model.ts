import { UserRegisterModel } from '../request/user-register-model';

export interface ResponseResetModel {
  user: UserRegisterModel;
  expiryDate: string;
  link: string;
  verifyType: string;
  userId: string;
}
