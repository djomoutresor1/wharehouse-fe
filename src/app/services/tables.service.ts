import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LaneModel } from 'src/model/corsia/lane-model';
import { RowModel } from 'src/model/corsia/row-model';
import { ShelfModel } from 'src/model/corsia/shelf-model';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(private http: HttpClient) { }

  public getDataTable() {
    return this.http.get<any>("../assets/mocks/dashboard.json");
  }

  
}
