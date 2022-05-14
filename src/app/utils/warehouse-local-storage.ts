import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';
import { Utils } from '../shared/enums/utils-enums';

export class WarehouseLocalStorage {
  user: any;
  WarehouseGetTokenLocalStorage() {
    if (localStorage.getItem(Utils.WAREHOUSE_JWT_TOKEN)) {
      if (
        typeof localStorage.getItem(Utils.WAREHOUSE_JWT_TOKEN) !==
          'undefined' &&
        JSON.parse(localStorage.getItem(Utils.WAREHOUSE_JWT_TOKEN) as string)
          .token
      ) {
        return JSON.parse(
          localStorage.getItem(Utils.WAREHOUSE_JWT_TOKEN) as string
        );
      }
    }
  }

  WarehouseSetTokenLocalStorage(response: ResponseLoginModel) {
    localStorage.setItem(Utils.WAREHOUSE_JWT_TOKEN, JSON.stringify(response));
  }

  WarehouseRemoveTokenLocalStorage() {
    this.user = Array.of(this.WarehouseGetTokenLocalStorage());
    console.log('this userd: ', this.user);

    if (
      typeof localStorage.getItem(Utils.WAREHOUSE_JWT_TOKEN) !== 'undefined' &&
      localStorage.getItem(Utils.WAREHOUSE_JWT_TOKEN)
    ) {
      localStorage.removeItem(this.user);
      localStorage.clear();
    }
  }

  WarehouseGetAuthorizationHeader() {
    if (
      typeof localStorage.getItem(Utils.WAREHOUSE_JWT_TOKEN) !== 'undefined' &&
      localStorage.getItem(Utils.WAREHOUSE_JWT_TOKEN)
    ) {
      const user: ResponseLoginModel = JSON.parse(
        localStorage.getItem(Utils.WAREHOUSE_JWT_TOKEN) as string
      );
      if (user && user?.token) {
        return {
          Authorization: `Bearer ${user?.token}`,
          REMOTE_USER: user?.userId, // Pass the userId or matricule generated in register fase for earch user in BE, TODO in BE
          refreshToken: user?.refreshToken,
          ROLES: user?.roles?.join(','), // Array of roles, want like this -> ROLE_USER,ROLE_ADMIN,ROLE_MODERATOR
        };
      } else {
        return {};
      }
    } else {
      return {};
    }
  }

  WarehouseGetLanguageLocalStorage() {
    if (localStorage.getItem(Utils.WAREHOUSE_USER_LANGUAGE)) {
      if (
        typeof localStorage.getItem(Utils.WAREHOUSE_USER_LANGUAGE) !==
        'undefined'
      ) {
        return localStorage.getItem(Utils.WAREHOUSE_USER_LANGUAGE);
      } else {
        return;
      }
    } else {
      return;
    }
  }
}
