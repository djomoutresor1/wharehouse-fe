import { UserRegisterModel } from '../request/user-register-model';

export interface ResponseRegisterModel {
  message: string;
  object: UserRegisterModel;
}
