import { UserRegisterModel, UserRegisterModelStepTwo } from '../resquest/user-register-model';

export interface ResponseRegisterModel {
  message: string;
  object: UserRegisterModel;
}

export interface ResponseRegisterModelTwo {
  message: string;
  objectTwo: UserRegisterModelStepTwo;
}


