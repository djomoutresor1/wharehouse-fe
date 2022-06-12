import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExternalApi } from '../shared/enums/external-api-enums';

@Injectable({
  providedIn: 'root'
})
export class FlagService {

  constructor(private http: HttpClient) {}

  // retrieve all country name and their flags
  public getDialCodeAndCountryFlag() {
    return this.http.get<any>(`${ExternalApi.WAREHOUSE_WORLD_COUNTRIES}?returns=currency,flag,unicodeFlag,dialCode`);
  }
}




