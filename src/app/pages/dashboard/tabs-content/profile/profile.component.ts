import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProfilService } from 'src/app/services/profil.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { BreadcrumbItemsModel } from 'src/model/utils/breadcrumb-items-model';

@Component({
  selector: 'warehouse-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userLocalStorage: any;
  breadcrumbItems!: BreadcrumbItemsModel;
  isAuth: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  profileURL: any;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private profilService: ProfilService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initComponent();
    this.userLocalStorage =
      this.warehouseLocalStorage?.WarehouseGetTokenLocalStorage();
    this.getInfosUser();
  }

  initComponent() {
    let currentLang = null;
    currentLang = this.translate.currentLang;
    if (currentLang === undefined) {
      currentLang =
        this.warehouseLocalStorage.WarehouseGetLanguageLocalStorage();
    }
    this.translate.use(currentLang as string);
    this.breadcrumbItems = {
      parent: {
        title: this.translate.instant('profile.title'),
      },
    };
  }

  getInfosUser() {
    this.profilService.getImageUser(this.userLocalStorage?.userId).subscribe(
      (response) => {
        let objectURL = 'data:image/jpeg;base64,' + response?.object?.data;
        this.profileURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      (error: HttpErrorResponse) => {
        console.log('Error Occured during downloading: ', error);
        this.errorAlertType(error?.error.message);
      }
    );
  }

  getRoleName(role: string) {
    switch (role) {
      case Utils.ROLE_ADMIN:
        return Utils.ADMINS;
        break;
      case Utils.ROLE_MODERATOR:
        return Utils.MODERATOR;
        break;
      case Utils.ROLE_USER:
        return Utils.USER;
        break;
      default:
        return Utils.USER;
        break;
    }
  }

  getUserColorRole(role: string) {
    switch (role) {
      case Utils.ROLE_USER:
        return '#0096c8';
        break;
      case Utils.ROLE_MODERATOR:
        return '#ffc107';
        break;
      case Utils.ROLE_ADMIN:
        return '#2a7a39';
        break;
      default:
        return '#0096c8';
        break;
    }
  }

  getRoleIcon(role: string) {
    switch (role) {
      case Utils.ROLE_USER:
        return 'user';
        break;
      case Utils.ROLE_MODERATOR:
        return 'user-switch';
        break;
      case Utils.ROLE_ADMIN:
        return 'team';
        break;
      default:
        return 'user';
        break;
    }
  }

  handleOnNavigate(url: String) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }

  handleOnEdit() {}

  handleOnBack() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
  }

  handleOnChangePassword() {
    this.router.navigate([
      `${Pages.WAREHOUSE}/${Pages.DASHBOARD}/${Pages.CHANGE_PASSWORD}`,
    ]);
  }

  errorAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_ERROR;
    this.messageAlert = message;
  }

  getMobilePhoneUser( phonePrefix: string, phoneNumber: string): string {
    return phonePrefix + ' ' + phoneNumber;
  }
}
