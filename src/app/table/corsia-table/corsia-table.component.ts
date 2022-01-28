import { Component, OnInit } from '@angular/core';
import { Models } from '../../../model/populateModel';

@Component({
  selector: 'corsiaTable',
  templateUrl: './corsia-table.component.html',
  styleUrls: ['./corsia-table.component.scss','../rack-table/rack-table.component.scss']
})
export class CorsiaTableComponent implements OnInit {

  constructor() { }
  
  // 4 ripiani
  ripiani = Array.from({length: 4}, (_, i) => i + 1);
  model = new Models();

  ngOnInit(): void {
  }

}
