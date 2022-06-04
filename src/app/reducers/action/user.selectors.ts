import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromUser from '../action/user.reducer';

export const selectUserState = createFeatureSelector<fromUser.UserState>(

    fromUser.userFeatureKey,

);

export const selectUsers = createSelector(
  selectUserState,
  (state: fromUser.UserState) => state.users
);

