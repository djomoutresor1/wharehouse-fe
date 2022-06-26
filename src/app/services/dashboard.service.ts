import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LanesModel } from 'src/model/corsia/lanes-model';
import { UserInsertModel } from 'src/model/dashboard/request/user-insert-model';
import { ResponseUserInsertModel } from 'src/model/dashboard/response/response-user-insert-model';
import { Dashboard } from '../shared/enums/dashboard-enums';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiServerUrl = environment.apiBaseUrl;

  private theme = new BehaviorSubject<boolean>(false);
  userTheme = this.theme.asObservable();
  private mode = new BehaviorSubject<boolean>(false);
  userMode = this.mode.asObservable();

  constructor(private http: HttpClient) {}

  public getDashboard() {
    return this.http.get<LanesModel>('../assets/mocks/dashboard.json');
  }

  public handleOnChangeTheme(selectedTheme: any): void {
    localStorage.setItem('theme', selectedTheme);
    return this.theme.next(selectedTheme);
  }

  public handleOnChangeMode(selectedMode: any): void {
    localStorage.setItem('mode', selectedMode);
    return this.mode.next(selectedMode);
  }

  public adminInsertUser(
    user: UserInsertModel
  ): Observable<ResponseUserInsertModel> {
    return this.http.post<ResponseUserInsertModel>(
      `${this.apiServerUrl}${Dashboard.WAREHOUSE_DASHBOARD_ADMIN_INSERT_USER}`,
      user
    );
  }
}
