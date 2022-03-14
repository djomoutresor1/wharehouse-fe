import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LaneModel } from 'src/model/corsia/lane-model';
import { RowModel } from 'src/model/corsia/row-model';
import { Pages } from '../../enums/pages-enums';

@Component({
  selector: 'warehouse-horizontal-lane',
  templateUrl: './horizontal-lane.component.html',
  styleUrls: ['./horizontal-lane.component.scss'],
})
export class HorizontalLaneComponent implements OnInit {
  
  @Input() lane: LaneModel = { rows: [], name: '' };

  goToLane:string ='click and go to Lane(Corsia)  ';
  number:string ='  rack number  '

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {}

  onSelectedLane(rack: RowModel, laneName: string) {
    this.router.navigate([`${Pages.RACK_DETAIL}/${laneName.toLocaleLowerCase()}`], {
      relativeTo: this.route,
    });
  }
}
