import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';
import { ResponseModel } from 'src/model/auth/response/response-model';
import { ResponseUserDataModel } from 'src/model/auth/response/response-user-data-model';
import { ResponseUserModel } from 'src/model/auth/response/response-user-model';
import { UserInsertModel } from 'src/model/dashboard/request/user-insert-model';
import { Auth } from '../shared/enums/auth-enums';
import { Pages } from '../shared/enums/pages-enums';
import { WarehouseLocalStorage } from '../utils/warehouse-local-storage';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private warehouseLocalStorage: WarehouseLocalStorage
  ) {}

  public getAllUsers(): Observable<ResponseUserDataModel[]> {
    return this.http.get<ResponseUserDataModel[]>(
      `${this.apiServerUrl}/${Pages.USERS}`
    );
  }

  public getUserInfos(userId: string): Observable<ResponseUserModel> {
    return this.http.get<ResponseUserModel>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_FIND_USER_INFOS}/${userId}`
    );
  }

  public onActivateUser(userId: string): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_ACTIVATE_DESATTIVATE_USER}/${userId}`,
      userId
    );
  }

  public onDeleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_DELETE_USER}/${userId}`
    );
  }

  public getImageUser(userImage: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_DOWNLOAD_IMAGE}/${userImage}`
    );
  }

  public onUpdateUser(
    user: UserInsertModel,
    userId: string
  ): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_UPDATE_USER}/${userId}`,
      user
    );
  }
}
