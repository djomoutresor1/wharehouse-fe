import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'warehouse-dashboard-footer',
  templateUrl: './dashboard-footer.component.html',
  styleUrls: ['./dashboard-footer.component.scss'],
  imports: [SharedModule],
  standalone: true
})
export class DashboardFooterComponent implements OnInit {

   currentYear = new Date().getFullYear();
   createdYear = Utils.WAREHOUSE_CREATED_SYSTEM;

  constructor() { }

  ngOnInit(): void {
  }

}
