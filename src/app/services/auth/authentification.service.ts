import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { environment } from 'src/environments/environment';
import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';
import { ResponseRegisterModel } from 'src/model/auth/response/response-register-model';
import { UserLoginModel } from 'src/model/auth/resquest/user-login-model';
import { UserRegisterModel, UserRegisterModelStepThree } from 'src/model/auth/resquest/user-register-model';
import { Auth } from '../../shared/enums/auth-enums';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private warehouseLocalStorage: WarehouseLocalStorage
  ) {}

  public userRegisterStepOne(
    user: UserRegisterModel,
    step: number
  ): Observable<ResponseRegisterModel> {
    return this.http.post<ResponseRegisterModel>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_REGISTER_USER}`,
      user,
      {
        params: {
          step,
        },
      }
    );
  }

  public userRegisterStepThree(
    user: UserRegisterModelStepThree,
    step: number,
    userName:String
  ): Observable<UserRegisterModelStepThree> {
    return this.http.patch<UserRegisterModelStepThree>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_REGISTER_USER_STEP_THREE}/${userName}`,
      user,
      {
        params: {
          step,
        },
      }
    );
  }

  public userLogin(user: UserLoginModel): Observable<ResponseLoginModel> {
    return this.http.post<ResponseLoginModel>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_LOGIN_USER}`,
      user
    );
  }

  public userLogout(userId: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_LOGOUT_USER}`,
      userId
    );
  }
}
