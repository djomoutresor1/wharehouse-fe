import { Component, Input, OnInit } from '@angular/core';
import { RackModel } from 'src/model/rack/rack-model';


@Component({
  selector: 'rackTable',
  templateUrl: './rack-table.component.html',
  styleUrls: ['./rack-table.component.scss'],
})
export class RackTableComponent implements OnInit {
  @Input() racks: RackModel[] = [];
  @Input() typeProduct: String = " ";

  rackFormat: RackModel[] = [];
  constructor() {}

  //positions des palettes dans les diverse ripiani
  positions = ['A', 'B', 'C'];

  ngOnInit(): void {
    console.log('racks: ', this.racks);
  }
}
