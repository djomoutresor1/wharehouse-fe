import { UserRegisterModel } from "src/model/auth/request/user-register-model";

export interface ResponseHelpModel {
  title: string;
  description: string;
  content: string;
  status: string;
  user: UserRegisterModel;
  createdAt: string;
  updatedAt: string;
}
