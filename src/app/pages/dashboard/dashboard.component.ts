import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProfilService } from 'src/app/services/profil.service';
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
  isAuth: boolean = false;
  isLogout: boolean = false;
  isValidToken: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  descriptionAlert: string = '';
  checkRole: any;
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
    private authorizationService: AuthorizationService,
    private profilService: ProfilService
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
    this.checkRole = this.warehouseUser?.roles.find(
      (role: any) => role === 'ROLE_ADMIN'
    );
    console.log('checkRole: ', this.checkRole);
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
          // Expiration token
          this.alertType = AlertType.ALERT_WARNING;
          this.okText = 'Go to login';
          this.messageAlert = `Session timeout expiration`;
          this.descriptionAlert = `Sorry, you session in Warehouse System is expired. Try relogin again and come back.`;
          this.isValidToken = true;
        } else {
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  errorAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_ERROR;
    this.messageAlert = message;
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

  handleOnUser(url: String) {
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

  handleOnAddUser() {
    this.router.navigate([`${Pages.USER}/${Pages.CREATE}`], {
      relativeTo: this.route,
    });
  }
}
