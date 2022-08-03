import { ResponseUserInfoModel } from "./response-user-info-model";
import { ResponseUserModel } from "./response-user-model";

export interface ResponseUserDataModel {
    user: ResponseUserModel;
    userInfo: ResponseUserInfoModel;
}