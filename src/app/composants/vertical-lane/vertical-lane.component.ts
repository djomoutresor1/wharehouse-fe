import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { LaneModel } from 'src/model/corsia/lane-model';
import { RowModel } from 'src/model/corsia/row-model';

@Component({
  selector: 'warehouse-vertical-lane',
  templateUrl: './vertical-lane.component.html',
  styleUrls: ['./vertical-lane.component.scss', '../../app.component.scss']
})
export class VerticalLaneComponent extends AppComponent implements OnInit {

  @Input() lane: LaneModel = {rows: [], name: ""};

  constructor() {
    super();
   }

  ngOnInit(): void {
  }

  onSelectedLane(lane: RowModel) {
    console.log("Lane: ", lane);
  }
}
