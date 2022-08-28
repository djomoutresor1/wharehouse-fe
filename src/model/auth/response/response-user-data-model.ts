import { ResponseAddressModel } from "./response-address-model";
import { ResponseContactModel } from "./response-contact-model";
import { ResponseUserInfoModel } from "./response-user-info-model";
import { ResponseUserModel } from "./response-user-model";

export interface ResponseUserDataModel {
    user: ResponseUserModel;
    userInfo: ResponseUserInfoModel;
    userAddress: ResponseAddressModel;
    userContact: ResponseContactModel;
}