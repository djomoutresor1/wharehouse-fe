import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExternalApi } from '../shared/enums/external-api-enums';

@Injectable({
  providedIn: 'root',
})
export class FlagService {
  constructor(private http: HttpClient) {}

  // Retrieve all countries name and theirs flags
  public getDialCodeAndCountryFlag() {
    return this.http.get<any>(
      `${ExternalApi.WAREHOUSE_WORLD_COUNTRIES}?returns=currency,flag,unicodeFlag,dialCode`
    );
  }

  // Get all states by country
  public getStatesByCountry(country: string) {
    return this.http.get<any>(
      `${ExternalApi.WAREHOUSE_STATES_BY_COUNTRY}${country}`
    );
  }
}
