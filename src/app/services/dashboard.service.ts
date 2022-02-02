import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanesModel } from 'src/model/corsia/lanes-model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public getDashboard() {
    return this.http.get<LanesModel>("../assets/mocks/entireDataMock.json");
  }
}
