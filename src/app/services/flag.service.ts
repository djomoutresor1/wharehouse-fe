import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlagService {
  [x: string]: any;

  constructor(private http: HttpClient) {}


  // retrieve all country name and their flags
  public getDialCodeAndCountryFlag() {
    return this.http.get<any>('https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,dialCode');
  }
  
}




