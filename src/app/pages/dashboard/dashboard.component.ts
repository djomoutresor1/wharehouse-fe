import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LaneModel } from 'src/model/corsia/lane-model';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends AppComponent implements OnInit {
  alphabet = Array.from(Array(15)).map((e, i) => i + 65);
  //corsie = this.alphabet.map((x) => String.fromCharCode(x));

  lanes: LaneModel[] = [];
  lastLane: any;

  constructor(private dashboardService: DashboardService) {
    super();
  }

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe((response) => {
      console.log('response: ', response);
      this.lanes = response.lanes.slice(0, 14);
      this.lastLane = response.lanes.slice(-1)[0];
      console.log('lastElement: ', response.lanes.slice(-1)[0]);
    });
  }
}
