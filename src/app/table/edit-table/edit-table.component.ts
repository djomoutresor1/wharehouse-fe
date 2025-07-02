import { Component, OnInit } from '@angular/core';
import { Models } from '../../../model/populateModel';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'editTable',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss', '../rack-table/rack-table.component.scss'],
  imports: [SharedModule],
  standalone: true

})
export class EditTableComponent implements OnInit {

  constructor() { }

  //positions des palettes dans les diverse ripiani
  positions =['A','B','C'];
  model = new Models();
  
  ngOnInit(): void {
  }

}
