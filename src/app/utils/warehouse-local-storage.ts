import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';
import { Utils } from '../shared/enums/utils-enums';

export class WarehouseLocalStorage {
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

  WarehouseSetTokenLocalStorage(resposne: ResponseLoginModel) {
    localStorage.setItem(Utils.WAREHOUSE_JWT_TOKEN, JSON.stringify(resposne));
  }

  WarehouseRemoveTokenLocalStorage() {
    if (
      typeof localStorage.getItem(Utils.WAREHOUSE_JWT_TOKEN) !== 'undefined' &&
      localStorage.getItem(Utils.WAREHOUSE_JWT_TOKEN)
    ) {
      localStorage.removeItem(Utils.WAREHOUSE_JWT_TOKEN);
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
          Authorization: user?.type + user?.token,
          REMOTE_USER: 'AF48760', // Pass the userId or matricule generated in register fase for earch user in BE, TODO in BE
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
}
