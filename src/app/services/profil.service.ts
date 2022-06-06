import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persons } from 'src/interfaces/profils';
import { Auth } from '../shared/enums/auth-enums';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public retrieveUser(): Observable<Persons> {
    return this.http.get<Persons>(`${this.apiServerUrl}/users`);
  }

  public onActivateUser(userId: string): Observable<Persons> {
    return this.http.put<any>(
      `${this.apiServerUrl}${Auth.WAREHOUSE_ACTIVATE_DESATTIVATE_USER}/${userId}`,
      userId
    );
  }


  public onDeleteUser(userId: string): Observable<Persons> {
    return this.http.delete<any>(`${this.apiServerUrl}${Auth.WAREHOUSE_DELETE_USER}/${userId}`);
  }
}
