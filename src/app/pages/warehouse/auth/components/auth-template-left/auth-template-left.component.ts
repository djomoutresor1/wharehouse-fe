import { Component, OnInit, Injector } from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';

@Component({
  selector: 'warehouse-auth-template-left',
  templateUrl: './auth-template-left.component.html',
  styleUrls: ['./auth-template-left.component.scss']
})
export class AuthTemplateLeftComponent  extends WarehouseBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  override ngOnInit(): void {
  }

}
