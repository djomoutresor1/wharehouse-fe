import { UserRegisterModel } from '../resquest/user-register-model';

export interface ResponseResetModel {
  user: UserRegisterModel;
  expiryDate: string;
  link: string;
  verifyType: string;
}
