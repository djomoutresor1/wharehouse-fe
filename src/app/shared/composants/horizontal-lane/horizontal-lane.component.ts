import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { LaneModel } from 'src/model/corsia/lane-model';

@Component({
  selector: 'warehouse-horizontal-lane',
  templateUrl: './horizontal-lane.component.html',
  styleUrls: ['./horizontal-lane.component.scss'],
})
export class HorizontalLaneComponent extends AppComponent implements OnInit {
  
  @Input() lane: LaneModel = { rows: [], name: '' };

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
