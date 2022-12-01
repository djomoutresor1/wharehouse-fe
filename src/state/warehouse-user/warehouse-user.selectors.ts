import { createSelector } from '@ngrx/store';
import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';
import { AppState } from '../app.state';

export const selectWarehouseUserData = createSelector(
  (state: AppState) => state.warehouseUserData,
  (warehouseUserData: ResponseLoginModel) => warehouseUserData
);
