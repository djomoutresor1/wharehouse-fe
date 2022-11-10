import { UserRegisterModel } from "src/model/auth/request/user-register-model";

export interface ResponseGlossaryModel {
  code: string;
  description: string;
  language: string;
  status?: string;
  object: string;
  user: UserRegisterModel;
  createdAt: string;
  updatedAt: string;
}