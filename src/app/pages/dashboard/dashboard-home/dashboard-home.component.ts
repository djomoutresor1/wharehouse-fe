import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  name = '';
  language: string = 'en';

  constructor(
    private dashboardService: DashboardService,
  ) {
  }

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
}
