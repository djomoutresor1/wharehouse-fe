import { Component, Injector, OnInit } from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { Pages } from 'src/app/shared/enums/pages-enums';

@Component({
  selector: 'warehouse-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent extends WarehouseBaseComponent implements OnInit {
  mode: any;
  theme: any;

  constructor(injector: Injector) {
    super(injector);
    if (localStorage.getItem('theme') !== undefined) {
      this.theme = localStorage.getItem('theme');
    }
    if (localStorage.getItem('mode') !== undefined) {
      this.mode = localStorage.getItem('mode');
    }
  }

  override ngOnInit(): void {}

  handleOnNavigate(url: String) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }

  handleOnChangeTheme(selectedTheme: any) {
    this.dashboardService.handleOnChangeTheme(selectedTheme);
  }

  handleOnChangeMode(selectedMode: any) {
    this.dashboardService.handleOnChangeMode(selectedMode);
  }
}
