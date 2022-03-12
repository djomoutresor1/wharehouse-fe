import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Pages } from 'src/app/shared/enums/pages-enums';
import { PathParams } from 'src/app/shared/enums/path-params-enums';
import { LaneModel } from 'src/model/corsia/lane-model';
import { RowModel } from 'src/model/corsia/row-model';
import { TableService } from 'src/app/services/table.service';
import { PositionModel } from 'src/model/corsia/position-model';
import { ShelfModel } from 'src/model/corsia/shelf-model';

@Component({
  selector: 'app-dashboard-rack-detail',
  templateUrl: './dashboard-rack-detail.component.html',
  styleUrls: ['./dashboard-rack-detail.component.scss'],
})
export class DashboardRackDetailComponent implements OnInit {
  rackName: any;
  rackNumber: any;
  lanes: LaneModel[] = [];
  resultRackName: any;
  s: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tableService: TableService
  ) {
    console.log('router: ', this.router);
    this.rackName = this.route.snapshot.paramMap.get(PathParams.RACK_NAME);
    console.log('rackName: ', this.rackName);
  }

  ngOnInit(): void {

    this.rackName = this.route.snapshot.paramMap.get(PathParams.RACK_NAME);
    this.rackNumber = this.route.snapshot.paramMap.get(PathParams.RACK_NUMBER);

    this.tableService.getDataTable().subscribe((response) => {
      console.log('response2: ', response.lanes);
      response.lanes.map((x) => {
        if (x.name === this.rackName.toLocaleUpperCase()) {
          this.resultRackName = x.rows.filter(
            (y) => y.row.toString() === this.rackNumber
          );
        }
      });
      let b = this.resultRackName[0].shelves;
      let a0 = b[0].positions;
      let a1 = b[1].positions;
      let a2 = b[2].positions;
      let a3 = b[3].positions;

      console.log('a0: ', a0);
      console.log('a1: ', a1);
      console.log('a2: ', a2);
      console.log('a3: ', a3);

      const result0: any = [];
      a0.forEach((x0: any) => {
        result0.push(x0.dimensions.length);
        result0.push(x0.dimensions.width);
        result0.push(x0.dimensions.depth);
      });

      const result1: any = [];
      a1.forEach((x1: any) => {
        result1.push(x1.dimensions.length);
        result1.push(x1.dimensions.width);
        result1.push(x1.dimensions.depth);
      });

      const result2: any = [];
      a2.forEach((x2: any) => {
        result2.push(x2.dimensions.length);
        result2.push(x2.dimensions.width);
        result2.push(x2.dimensions.depth);
      });

      const result3: any = [];
      a3.forEach((x3: any) => {
        result3.push(x3.dimensions.length);
        result3.push(x3.dimensions.width);
        result3.push(x3.dimensions.depth);
      });
    });
  }

  handleOnNavigate(url: String) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }
}
