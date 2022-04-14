import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardHomeComponent } from 'src/app/pages/dashboard/dashboard-home/dashboard-home.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LaneModel } from 'src/model/corsia/lane-model';
import { RowModel } from 'src/model/corsia/row-model';
import { Pages } from '../../enums/pages-enums';

@Component({
  selector: 'warehouse-vertical-lane',
  templateUrl: './vertical-lane.component.html',
  styleUrls: ['./vertical-lane.component.scss'],
})
export class VerticalLaneComponent implements OnInit {
  @Input() lane: LaneModel = { rows: [], name: '' };

  goToLane:string ='click and go to Lane(Corsia)  ';
  number:string ='  rack number  ';
  empty:boolean=false;
  myCompOneObj:any


  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }


  onSelectedLane(rack: RowModel, laneName: string) {

    this.router.navigate([`${Pages.RACK_DETAIL}/${laneName.toLocaleLowerCase()}/${rack.row}`], {
      relativeTo: this.route,
    });
    console.log('rackNumber: ',rack.row)
  }

  onSelectedLaneName(laneName: string){
    
    this.router.navigate([`${Pages.GLOBAL_RACK}/${laneName.toLocaleUpperCase()}`], {
      relativeTo: this.route,
    });
  }

}
