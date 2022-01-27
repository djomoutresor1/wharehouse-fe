import { Component, OnInit } from '@angular/core';
import { Models } from 'src/model/populateModel';

@Component({
  selector: 'editTable',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss', '../rack-table/rack-table.component.scss']

})
export class EditTableComponent implements OnInit {

  constructor() { }

  //positions des palettes dans les diverse ripiani
  positions =['A','B','C'];
  model = new Models();
  
  ngOnInit(): void {
  }

}
