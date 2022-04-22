import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LaneModel } from 'src/model/corsia/lane-model';
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
  @Input() freeBox: boolean = false;


  goToLane:string ='click and go to Lane(Corsia)  ';
  number:string ='  rack number  '

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {}

  onSelectedLane(rack: RowModel, laneName: string) {
    this.router.navigate([`${Pages.RACK_DETAIL}/${laneName.toLocaleLowerCase()}`], {
      relativeTo: this.route,
    });
  }

  isFreeBox(rack: RowModel, index: number) {
    let shelfFound = rack.shelves.find(
      (shelf: ShelfModel) => shelf.shelf === index + 1
    );

    let positionFound = shelfFound?.positions.find(
      (position) =>
        position.dimensions.length === 0 ||
        position.dimensions.depth === 0 ||
        position.dimensions.width === 0
    );

    return positionFound ? false : true;
  }
}
