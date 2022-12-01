import { ResponseLoginModel } from "src/model/auth/response/response-login-model";

export interface AppState {
  warehouseUserData: Readonly<ResponseLoginModel>;
}
