import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DimensionModel } from 'src/model/corsia/dimension-model';
import { LaneModel } from 'src/model/corsia/lane-model';
import { PositionModel } from 'src/model/corsia/position-model';
import { RowModel } from 'src/model/corsia/row-model';
import { ShelfModel } from 'src/model/corsia/shelf-model';
import { Pages } from '../../enums/pages-enums';

@Component({
  selector: 'warehouse-vertical-lane',
  templateUrl: './vertical-lane.component.html',
  styleUrls: ['./vertical-lane.component.scss'],
})
export class VerticalLaneComponent implements OnInit {
  @Input() lane: LaneModel = { rows: [], name: '' };

  goToLane: string = 'Lane(Corsia)  ';
  free: string = '  free shelf =  ';
  empty: boolean = false;
  numberFreebox: any;

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

  /*isFreeBoxFirst(rack: RowModel, index: number): any {
    if (rack.row === index + 1) {
      return rack?.shelves.filter((shelf: ShelfModel) => {
        return Object.keys(shelf?.positions.filter(
          (position: PositionModel) => {
            return Object.keys(position.dimensions.depth === 0).length
          }
          )).length
      })
    }else{
      return
    }
  }*/
  isFreeBoxFirst(rack: RowModel, index: number): any {
    let positionsFound;
    if (rack.row === index + 1) { // 6 because slice(6,12)
      positionsFound = rack.shelves.find((shelf: ShelfModel) =>
        shelf?.positions.find(
          (position: PositionModel) =>
         //   position.dimensions.length === 0 ||
            position.dimensions.depth === 0 
       //     position.dimensions.width === 0
        )
      );
      return positionsFound?.positions?.length;
    } else {
      return 0;
    }
  }

  isFreeBoxSecond(rack: RowModel, index: number) {
    let positionFound;
    if (rack.row === index + 1 + 6) {
      // 6 because slice(6,12)
      positionFound = rack.shelves.find((shelf: ShelfModel) =>
        shelf?.positions.find(
          (position: PositionModel) =>
            Object.keys(position.dimensions.depth === 0).length
        )
      );
    }else{
      return
    }
  }
  /* isFreeBoxSecond(rack: RowModel, index: number): boolean {
    let positionFound;
    if (rack.row === index + 1+6) { // 6 because slice(6,12)
      positionFound = rack.shelves.find((shelf: ShelfModel) =>
        shelf?.positions.find(
          (position: PositionModel) =>
            position.dimensions.width === 0
        )
      );
      return positionFound ? false : true;
    } else {
      return true;
    }
  }

  isNumberOfPlaceFirst(rack: RowModel, index: number) {
    
    if (rack.row === index + 1) {
   return     rack.shelves.filter((place:ShelfModel) =>(place.freePlaces > 0 && place.freePlaces <= 3)).length ;
    }else{
      return
    }
   
  }


   isFreeBoxSecond(rack: RowModel, index: number): boolean {
    let positionFound;
    if (rack.row === index + 1 + 6) { // 6 because slice(6,12)
      positionFound = rack.shelves.find((shelf: ShelfModel) =>
        shelf?.positions.find(
          (position: PositionModel) =>
            position.dimensions.width === 0
        )
      );
      return positionFound ? false : true;
    } else {
      return true;
    }
  }*/
}
