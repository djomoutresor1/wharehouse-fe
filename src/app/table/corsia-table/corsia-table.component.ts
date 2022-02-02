import { Component, OnInit } from '@angular/core';
import { TablesService } from 'src/app/services/tables.service';
import { Models } from '../../../model/populateModel';

@Component({
  selector: 'corsiaTable',
  templateUrl: './corsia-table.component.html',
  styleUrls: ['./corsia-table.component.scss','../rack-table/rack-table.component.scss']
})
export class CorsiaTableComponent implements OnInit {

 // rowsTable: LaneModel[] = [];
 lanes: any;
 corsiaTable: any;
  rackTable:any;


  constructor(private tablesService: TablesService) {
  }

  ngOnInit() {
    let a:[]=[];
    this.tablesService.getDataTable().subscribe((response) => {
      console.log("response2: ", response);
      this.lanes = response.lanes[0].rows;
      this.corsiaTable = this.lanes.forEach((element: any) => {
        console.log("corsiaTable2: ", element.row);
      });  
    });

  }



}
