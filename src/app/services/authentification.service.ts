import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from 'src/model/auth/user-model';
import { Auth } from '../shared/enums/auth-enums';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public userRegister(user: UserModel): Observable<any> {
    return this.http.post<UserModel>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_REGISTER_USER}`,
      user
    );
  }
}
