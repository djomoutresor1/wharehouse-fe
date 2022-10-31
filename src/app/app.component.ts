import { Component, Injector, OnInit } from '@angular/core';
import en from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
import { WarehouseBaseComponent } from './base/warehouse-base/warehouse-base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends WarehouseBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    registerLocaleData(en)
  }
}
