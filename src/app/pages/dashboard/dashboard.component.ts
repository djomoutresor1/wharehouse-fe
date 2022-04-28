import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  warehouseUser: any;
  theme: any = false;
  mode: any = false;
  isCollapsed = false;
  isLogout: boolean = false;
  isValidToken: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  descriptionAlert: string = '';
  okText: string = '';

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
    private dashboardService: DashboardService,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private authorizationService: AuthorizationService
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

  ngOnInit(): void {
    this.warehouseUser =
      this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    if (this.warehouseUser?.token) {
      this.handleOnVerifyToken(this.warehouseUser?.token);
    }
  }

  handleOnVerifyToken(token: string) {
    this.authorizationService.userValidToken(token).subscribe(
      (response) => {
        console.log('response: ', response);
        this.isValidToken = false;
      },
      (error: HttpErrorResponse) => {
        console.log('error: ', error);
        if (error?.status === 403) {
          this.alertType = AlertType.ALERT_WARNING;
          this.okText = 'Login again';
          this.messageAlert = `Authorization failed`;
          this.descriptionAlert = `Sorry, you authorization in the Warehouse System isn't allowed.`;
          this.isValidToken = true;
        }
      }
    );
  }

  handleOnNavigate(url: String) {
    console.log('handleOnNavigate: ', url);
    if (url === 'logout') {
      this.isLogout = true;
      this.alertType = AlertType.ALERT_SUCCESS;
      this.messageAlert = `Good bye`;
      this.descriptionAlert = 'Hope to see your soon in our system.';
    }
    this.router.navigate([`${Pages.WAREHOUSE}/${url}/`]);
  }

  handleOnCollapsed(collapsed: boolean) {
    this.isCollapsed = collapsed;
  }

  handleOnOkModal(event: string) {
    if (event === Utils.WAREHOUSE_TIMEOUT_TOKEN) {
      this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
      window.location.reload();
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
    }
  }
}
