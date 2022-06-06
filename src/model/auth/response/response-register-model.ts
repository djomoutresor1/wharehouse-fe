import { UserRegisterModel, UserRegisterModelStepThree } from '../resquest/user-register-model';

export interface ResponseRegisterModel {
  message: string;
  object: UserRegisterModel;
}

export interface ResponseRegisterModelTwo {
  message: string;
  objectTwo: UserRegisterModelStepThree;
}


