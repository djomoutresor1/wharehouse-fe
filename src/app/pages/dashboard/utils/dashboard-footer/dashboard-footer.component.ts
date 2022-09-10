import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/enums/utils-enums';

@Component({
  selector: 'warehouse-dashboard-footer',
  templateUrl: './dashboard-footer.component.html',
  styleUrls: ['./dashboard-footer.component.scss']
})
export class DashboardFooterComponent implements OnInit {

   currentYear = new Date().getFullYear();
   createdYear = Utils.CREATED_WAREHOUSE_SYSTEM;

  constructor() { }

  ngOnInit(): void {
  }

}
