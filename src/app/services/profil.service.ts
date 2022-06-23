import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persons } from 'src/interfaces/profils';
import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';
import { UserUpdateModel } from 'src/model/auth/resquest/user-register-model';
import { Auth } from '../shared/enums/auth-enums';
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

  public getAllUsers(): Observable<ResponseLoginModel[]> {
    return this.http.get<ResponseLoginModel[]>(`${this.apiServerUrl}/users`);
  }

  public onActivateUser(userId: string): Observable<Persons> {
    return this.http.put<any>(
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

  public onUpdateUser(user: UserUpdateModel,userId:string): Observable<any> {
    return this.http.put<any>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_UPDATE_USER}/${userId}`,user
    );
  }
}
