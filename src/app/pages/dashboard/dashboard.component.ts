import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Pages } from 'src/app/shared/enums/pages-enums';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  theme: any = false;
  mode: any = false;
  isCollapsed = false;

  @HostListener('document:click', ['$event'])
  clickout() {
    console.log(
      "localStorage.getItem('theme'): ",
      localStorage.getItem('theme')
    );
    if (localStorage.getItem('theme')) {
      this.dashboardService.userTheme.subscribe((theme) => {
        this.theme = theme;
      });
    }
    if (localStorage.getItem('mode')) {
      this.dashboardService.userMode.subscribe((mode) => {
        this.mode = mode;
      });
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService
  ) {
    console.log(
      "localStorage.getItem('theme'): ",
      localStorage.getItem('theme')
    );

    if (localStorage.getItem('theme')) {
      this.dashboardService.userTheme.subscribe((theme) => {
        this.theme = theme;
      });
    }
    if (localStorage.getItem('mode')) {
      this.dashboardService.userTheme.subscribe((mode) => {
        this.mode = mode;
      });
    }
  }

  ngOnInit(): void {}

  handleOnNavigate(url: String) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}/`]);
  }

  handleOnCollapsed(collapsed: boolean) {
    this.isCollapsed = collapsed;
  }
}
