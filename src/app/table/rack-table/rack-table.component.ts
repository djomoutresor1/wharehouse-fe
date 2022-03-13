import { Component, Input, OnInit } from '@angular/core';
import { RackModel } from 'src/model/rack/rack-model';
import { Models } from '../../../model/populateModel';

@Component({
  selector: 'rackTable',
  templateUrl: './rack-table.component.html',
  styleUrls: ['./rack-table.component.scss'],
})
export class RackTableComponent implements OnInit {
  @Input() racks: RackModel[] = [];

  rackFormat: RackModel[] = [];
  constructor() {}

  //positions des palettes dans les diverse ripiani
  positions = ['A', 'B', 'C'];
  model = new Models();

  ngOnInit(): void {
    console.log('racks: ', this.racks);
  }
}
