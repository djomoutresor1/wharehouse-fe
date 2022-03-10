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
export class DashboardRackDetailComponent implements  OnInit {

  rackName: any;
  rackNumber:any;
  lanes: LaneModel[] = [];
  resultRackName: any;

  resultshelves: any;



  constructor(private router: Router, private route: ActivatedRoute,private tableService: TableService) {
     
    console.log('router: ', this.router);
    this.rackName = this.route.snapshot.paramMap.get(PathParams.RACK_NAME);
    console.log('rackName: ', this.rackName);

  }

  ngOnInit(): void {

    this.rackName = this.route.snapshot.paramMap.get(PathParams.RACK_NAME);
    this.rackNumber = this.route.snapshot.paramMap.get(PathParams.RACK_NUMBER);

    this.tableService.getDataTable().subscribe((response) => {
      console.log("response2: ", response.lanes);
      response.lanes.map((x) => {
        if(x.name === this.rackName.toLocaleUpperCase()) {
          this.resultRackName = x.rows.filter((y) => y.row.toString() === this.rackNumber);
        }
      });
      let b = this.resultRackName[0].shelves;
      b.map(function (value: ShelfModel) {
        console.log("positions: ",value.positions);

        let c = value.positions;
        c.map(function (value: PositionModel) {
          console.log("dimensions: ",value.dimensions);
          console.log("length: ",value.dimensions.length);
          console.log("width: ",value.dimensions.width);
          console.log("depth: ",value.dimensions.depth);
      });
    });


       console.log('resultRackName: ',this.resultRackName ); 
       console.log('shelvese: ',this.resultRackName[0].shelves ); 
       
    });
    
  }

  handleOnNavigate(url: String) {

   this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }
}
