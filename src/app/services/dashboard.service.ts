import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanesModel } from 'src/model/corsia1/lanes-model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public getDashboard() {
//    return this.http.get("../assets/mocks/warehouse.json");
    return this.http.get<LanesModel>("../assets/mocks/entireDataMock.json");
  }
}
