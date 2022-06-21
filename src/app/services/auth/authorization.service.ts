import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/shared/enums/auth-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { environment } from 'src/environments/environment';
import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';
import { ResponseModel } from 'src/model/auth/response/response-model';
import { ResponseRegisterModel } from 'src/model/auth/response/response-register-model';
import { ResponseResetModel } from 'src/model/auth/response/response-reset-model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private warehouseLocalStorage: WarehouseLocalStorage
  ) {}

  // TODO: Verify if the token user is valid
  public userValidToken(token: string): Observable<ResponseRegisterModel> {
    return this.http.get<ResponseRegisterModel>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_VERIFY_TOKEN}/${token}`
    );
  }

  public userForgotPassword(email: string): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_FORGOT_PASSWORD}/${email}`
    );
  }

  public userFindByUserId(userId: string): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_FIND_USER}/${userId}`
    );
  }

  public userVerifyLink(link: string, verifyType: string): Observable<ResponseResetModel> {
    return this.http.get<ResponseResetModel>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_VERIFY_LINK}`, {
        params: {
          link,
          verifyType
        }
      }
    );
  }

  public userResetPassword(email: string, password: string): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_RESET_PASSWORD}`, {
        email, password
      }
    );
  }

  public userChangePassword(userId: string, oldPassword: string, newPassword: string): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_CHANGE_PASSWORD}`, {
        userId, oldPassword, newPassword
      }
    );
  }

  // TODO: The user want to refresh the token, because it is expired
  public userRefreshToken() {}

  public userVerificationEmail(email: string): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_VERIFICATION_EMAIL}/${email}`
    );
  }
}
