import { Component, OnInit } from '@angular/core';
import { Models } from '../../../model/populateModel';

@Component({
  selector: 'rackTable',
  templateUrl: './rack-table.component.html',
  styleUrls: ['./rack-table.component.scss']
})
export class RackTableComponent implements OnInit {

  constructor() { }

      // 4 ripiani
    ripiani = Array.from({length: 4}, (_, i) => i + 1);

    //positions des palettes dans les diverse ripiani
    positions =['A','B','C'];
    model = new Models();

  ngOnInit(): void {
  }

}
