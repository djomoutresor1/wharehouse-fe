import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/shared/enums/auth-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { environment } from 'src/environments/environment';
import { ResponseRegisterModel } from 'src/model/auth/response/response-register-model';

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

  // TODO: The user want to refresh the token, because it is expired
  public userRefreshToken() {}
}
