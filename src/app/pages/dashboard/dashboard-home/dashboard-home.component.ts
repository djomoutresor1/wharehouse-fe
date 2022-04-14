import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LaneModel } from 'src/model/corsia/lane-model';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  lanes: LaneModel[] = [];
  lastLane: any;
  
  

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void { 
    this.dashboardService.getDashboard().subscribe(
      (response) => {
        this.lanes = response.lanes.slice(0, 14);
        this.lastLane = response.lanes.slice(-1)[0];
        this.remapLanes(response)
      },
      (error: HttpErrorResponse) => {
        console.log('error: ', error);
      }
    );    
  }

  checkAdult(age:any) {
    return age > 18;
  }

  remapLanes(response: { lanes: { rows: any[]; }[]; }){
    debugger
      const newLanes =response.lanes.map((lane: { rows: any[]; }) =>{
        return{...lane,rows:lane.rows.map((row)=>{
            const isEditable = row.shelves.some((shelve: { positions: any[]; })=>{
                return shelve.positions.some((value:any) =>
                  !value.dimensions ||
                  !value.dimensions.length||
                  !value.dimensions.depth||
                  !value.dimensions.width);
            });
            return { ...row.shelves, isEditable};
          })
        } 
      })
  }





}
