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
  isEditable:any;
  values:any
  
  

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void { 
    this.dashboardService.getDashboard().subscribe(
      (response) => {
        this.lanes = response.lanes.slice(0, 14);
        this.lastLane = response.lanes.slice(-1)[0];
      },
      (error: HttpErrorResponse) => { 
        console.log('error: ', error);
      }
    );    
  }

  checkAdult(value:number) {
   if(value!== undefined){
     return true
   }
   return false
  }


  //pour controller s'il existe au moins une valeur null dans le tableau
 /* remapLanes(response: { lanes: { rows: any[]; }[]; }){
      const newLanes =response.lanes.map((lane: { rows: any[]; }) =>{
        return{...lane,rows:lane.rows.map((row)=>{
            const isEditable = row.shelves.find((shelve: { positions: any[]; })=>{
                return shelve.positions.some((values:any) =>
                  (values.dimensions)=0 ||
                  (values.dimensions.length)==0||
                  (values.dimensions.depth)==0||
                  (values.dimensions.width)==0)
            });            return  this.checkAdult(isEditable?.shelf);
          })
        } 
      })
  }*/





}
