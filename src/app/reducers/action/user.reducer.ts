import { Action, createReducer, on } from '@ngrx/store';
import { UserRegisterModel } from 'src/model/auth/resquest/user-register-model';
import * as UserActions from '../action/user.actions';


export const userFeatureKey = 'user';

export interface UserState {
  users: UserRegisterModel[];
}

export const initialState: UserState = {
  users: []
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers,
      (state: UserState, {user}) =>({...state,users: [...state.users, user]
          }))

);

export function reducer(state: UserState | undefined, action: Action): any {
  return userReducer(state, action);
}
