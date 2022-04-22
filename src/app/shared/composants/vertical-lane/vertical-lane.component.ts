import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardHomeComponent } from 'src/app/pages/dashboard/dashboard-home/dashboard-home.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LaneModel } from 'src/model/corsia/lane-model';
import { PositionModel } from 'src/model/corsia/position-model';
import { RowModel } from 'src/model/corsia/row-model';
import { ShelfModel } from 'src/model/corsia/shelf-model';
import { RackModel } from 'src/model/rack/rack-model';
import { Pages } from '../../enums/pages-enums';

@Component({
  selector: 'warehouse-vertical-lane',
  templateUrl: './vertical-lane.component.html',
  styleUrls: ['./vertical-lane.component.scss'],
})
export class VerticalLaneComponent implements OnInit {
  @Input() lane: LaneModel = { rows: [], name: '' };


  goToLane: string = 'click and go to Lane(Corsia)  ';
  number: string = '  rack number  ';
  empty: boolean = false;
  myCompOneObj: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  onSelectedLane(rack: RowModel, laneName: string) {
    this.router.navigate(
      [`${Pages.RACK_DETAIL}/${laneName.toLocaleLowerCase()}/${rack.row}`],
      {
        relativeTo: this.route,
      }
    );
    console.log('rackNumber: ', rack.row);
  }

  onSelectedLaneName(laneName: string) {
    this.router.navigate(
      [`${Pages.GLOBAL_RACK}/${laneName.toLocaleUpperCase()}`],
      {
        relativeTo: this.route,
      }
    );
  }

  isFreeBoxFirst(rack: RowModel, index: number):boolean {
    let checkFreeBox;
    if (rack.row === index + 1) {
      checkFreeBox = rack.shelves.find((place: ShelfModel) =>
         (place.freePlaces > 0 && place.freePlaces <= 3)
        )
      return checkFreeBox ? true : false;
    } else {
      return false;
    }
  }

  isFreeBoxSecond(rack: RowModel, index: number):boolean {
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

/*  isFreeBoxFirst(rack: RowModel, index: number): boolean {
    let positionFound;
    if (rack.row === index + 1) {
      positionFound = rack.shelves.find((shelf: ShelfModel) =>
        shelf?.positions.find(
          (position: PositionModel) =>
            position.dimensions.length === 0 ||
            position.dimensions.depth === 0 ||
            position.dimensions.width === 0
        )
      );
      return positionFound ? false : true;
    } else {
      return true;
    }
  }

  isFreeBoxSecond(rack: RowModel, index: number): boolean {
    let positionFound;
    if (rack.row === index + 1 + 6) { // 6 because slice(6,12)
      positionFound = rack.shelves.find((shelf: ShelfModel) =>
        shelf?.positions.find(
          (position: PositionModel) =>
            position.dimensions.length === 0 ||
            position.dimensions.depth === 0 ||
            position.dimensions.width === 0
        )
      );
      return positionFound ? false : true;
    } else {
      return true;
    }
  }*/
}
