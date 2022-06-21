import { UserRegisterModel, UserRegisterModelStepThree } from '../request/user-register-model';

export interface ResponseRegisterModel {
  message: string;
  object: UserRegisterModel;
}

export interface ResponseRegisterModelTwo {
  message: string;
  objectTwo: UserRegisterModelStepThree;
}


