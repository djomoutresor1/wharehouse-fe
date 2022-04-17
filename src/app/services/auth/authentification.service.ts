import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';
import { ResponseRegisterModel } from 'src/model/auth/response/response-register-model';
import { UserLoginModel } from 'src/model/auth/resquest/user-login-model';
import { UserRegisterModel } from 'src/model/auth/resquest/user-register-model';
import { Auth } from '../../shared/enums/auth-enums';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public userRegister(
    user: UserRegisterModel
  ): Observable<ResponseRegisterModel> {
    return this.http.post<ResponseRegisterModel>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_REGISTER_USER}`,
      user
    );
  }

  public userLogin(
    user: UserLoginModel
  ): Observable<ResponseLoginModel> {
    return this.http.post<ResponseLoginModel>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_LOGIN_USER}`,
      user
    );
  }
}
