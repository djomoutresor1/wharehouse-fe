import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LaneModel } from 'src/model/corsia/lane-model';
import { LanesModel } from 'src/model/corsia/lanes-model';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  data: LaneModel[] = [];

  constructor(private http: HttpClient) {}

  public getDataTable() {
    return this.http.get<LanesModel>('../assets/mocks/warehouse.json');
  }

  ngOnInit(): void {
    this.getDataTable().subscribe((response) => {
      console.log('response: ', response);
      this.data = response.lanes;
      console.log('dataTable: ', response.lanes);
    },(err)=>{ console.log("erunable to get data from urk " + err)});
  }
}
