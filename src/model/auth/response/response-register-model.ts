import { UserRegisterModel } from '../resquest/user-register-model';

export interface ResponseRegisterModel {
  message: string;
  object: UserRegisterModel;
}
