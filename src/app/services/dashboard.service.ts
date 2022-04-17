import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LanesModel } from 'src/model/corsia/lanes-model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private theme = new BehaviorSubject<boolean>(false);
  userTheme = this.theme.asObservable();
  private mode = new BehaviorSubject<boolean>(false);
  userMode = this.mode.asObservable();

  constructor(private http: HttpClient) {}

  public getDashboard() {
    return this.http.get<LanesModel>('../assets/mocks/entireDataMock.json');
  }

  public handleOnChangeTheme(selectedTheme: any): void {
    localStorage.setItem('theme', selectedTheme);
    return this.theme.next(selectedTheme);
  }

  public handleOnChangeMode(selectedMode: any): void {
    localStorage.setItem('mode', selectedMode);
    return this.mode.next(selectedMode);
  }
}
