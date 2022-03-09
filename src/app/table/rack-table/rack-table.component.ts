import { Component, OnInit } from '@angular/core';
import { Models } from '../../../model/populateModel';

@Component({
  selector: 'rackTable',
  templateUrl: './rack-table.component.html',
  styleUrls: ['./rack-table.component.scss']
})
export class RackTableComponent implements OnInit {

  constructor() { }

    //positions des palettes dans les diverse ripiani
    positions =['A','B','C'];
    model = new Models();

  ngOnInit(): void {
  }

}
