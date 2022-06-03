import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromUser from '../action/user.reducer';

export const selectCustomerState = createFeatureSelector<fromUser.UserState>(

    fromUser.userFeatureKey,

);

export const selectCustomers = createSelector(
  selectCustomerState,
  (state: fromUser.UserState) => state.users
);

