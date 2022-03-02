import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LaneModel } from 'src/model/corsia/lane-model';
import { RowModel } from 'src/model/corsia/row-model';
import { Pages } from '../../enums/pages-enums';

@Component({
  selector: 'warehouse-vertical-lane',
  templateUrl: './vertical-lane.component.html',
  styleUrls: ['./vertical-lane.component.scss'],
})
export class VerticalLaneComponent extends AppComponent implements OnInit {
  @Input() lane: LaneModel = { rows: [], name: '' };

  constructor(private route: ActivatedRoute, private router: Router) {
    super();
  }

  ngOnInit(): void {}

  onSelectedLane(lane: RowModel, name: string) {
    console.log('rack: ', name, lane);
    let rack = { name, lane };
    this.router.navigate([`${Pages.RACK_DETAIL}/${name.toLocaleLowerCase()}`], {
      relativeTo: this.route,
    });
  }
}
