import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, Injector, OnInit } from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends WarehouseBaseComponent implements OnInit {
  warehouseUser: any;
  theme: any = false;
  mode: any = false;
  isCollapsed = false;
  isLogout: boolean = false;
  isValidToken: boolean = false;
  checkRole: any;

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

  constructor(injector: Injector) {
    super(injector);
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

  override ngOnInit(): void {
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
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          this.errorAlertType(error?.error.message);
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
    setTimeout(() => {
      this.router.navigate([`${Pages.WAREHOUSE}/${url}/`]);
    }, 1000)
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
