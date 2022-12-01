import { createAction, props } from "@ngrx/store";
import { ResponseLoginModel } from "src/model/auth/response/response-login-model";

export const setWarehouseUserLogged = createAction('Set Warehouse user data logged', props<ResponseLoginModel>());
export const getWarehouseUserLogged = createAction('Get Warehouse user data logged');
