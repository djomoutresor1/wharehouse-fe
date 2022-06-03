import { createAction, props } from '@ngrx/store';
import { UserRegisterModel } from 'src/model/auth/resquest/user-register-model';

export const loadUsers = createAction(
  '[User] Load Users',
  (user: UserRegisterModel) => ({user})
);




