import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public getDashboard() {
//    return this.http.get("../assets/mocks/warehouse.json");
    return this.http.get("../assets/mocks/entireDataMock.json");
  }
}
