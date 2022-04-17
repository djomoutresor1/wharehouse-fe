import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(
    private http: HttpClient,
    private warehouseLocalStorage: WarehouseLocalStorage
  ) {}

  // TODO: Verify if the token user is valid
  public userValidToken() {}

  // TODO: The user want to refresh the token, because it is expired
  public userRefreshToken() {}
}
