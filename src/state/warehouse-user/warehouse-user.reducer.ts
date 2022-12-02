import { createReducer, on } from '@ngrx/store';
import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';
import {
  getWarehouseUserLogged,
  setWarehouseUserLogged,
} from './warehouse-user.actions';

export const initialState: Readonly<ResponseLoginModel> = {
  fullname: '',
  userId: '',
  enabled: false,
  message: '',
  token: '',
  refreshToken: '',
  username: '',
  email: '',
  roles: [],
  gender: '',
  dateOfBirth: '',
  phoneNumber: 0,
  country: '',
  lastLogin: '',
  createdAt: '',
  updatedAt: '',
  deletedAt: '',
  userInfo: {
    adminUser: false,
    temporalPassword: false,
    status: '',
    emailVerified: false,
    emailPecVerified: false,
  },
  contact: {
    userId: '',
    phonePrefix: '',
    phoneNumber: '',
    landlinePrefix: '',
    landlineNumber: '',
  },
  address: {
    userId: '',
    country: '',
    state: '',
    zipCode: '',
    addressLine: '',
  },
};

export const warehouseUserReducer = createReducer(
  initialState,
  on(getWarehouseUserLogged, (state) => {
    return state;
  }),
  on(setWarehouseUserLogged, (state) => {
    return state;
  })
);
