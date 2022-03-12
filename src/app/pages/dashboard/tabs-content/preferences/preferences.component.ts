import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Pages } from 'src/app/shared/enums/pages-enums';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent implements OnInit {
  mode: any;
  theme: any;

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {
    if (localStorage.getItem('theme') !== undefined) {
      this.theme = localStorage.getItem('theme');
    }
    if (localStorage.getItem('mode') !== undefined) {
      this.mode = localStorage.getItem('mode');
    }
  }

  ngOnInit(): void {}

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
