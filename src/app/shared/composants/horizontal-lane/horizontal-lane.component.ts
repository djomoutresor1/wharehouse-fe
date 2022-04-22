import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaneModel } from 'src/model/corsia/lane-model';
import { PositionModel } from 'src/model/corsia/position-model';
import { RowModel } from 'src/model/corsia/row-model';
import { ShelfModel } from 'src/model/corsia/shelf-model';
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

  isFreeHorizontal(rack: RowModel, index: number):boolean {
    let checkFreeBox;
    if (rack.row === index + 1+6) {
      checkFreeBox = rack.shelves.find((place: ShelfModel) =>
         (place.freePlaces > 0 && place.freePlaces <= 3)
        )
      return checkFreeBox ? true : false;
    } else {
      return false;
    }
  }
}
