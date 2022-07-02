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
import * as moment from 'moment';
import * as _ from 'lodash';
import { FlagService } from 'src/app/services/flag.service';
import { ResponseUserModel } from 'src/model/auth/response/response-user-model';
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
  okText: string = '';
  descriptionAlert: string = '';
  isExpiredToken: boolean = false;
  countryAndFlagData: any[] = [];
  prefixPhoneData: any[] = [];
  dateFormat = 'DD/MM/YYYY HH:mm:ss';
  enableEdit: boolean = true;
  dataUser: any;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private profilService: ProfilService,
    private sanitizer: DomSanitizer,
    private flagService: FlagService
  ) {}

  ngOnInit(): void {
    this.initComponent();
    this.userLocalStorage =
      this.warehouseLocalStorage?.WarehouseGetTokenLocalStorage();
    this.getCountriesAndPrefixPhoneWorld();
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
    this.profilService.getUserInfos(this.userLocalStorage?.userId).subscribe(
      (response: ResponseUserModel) => {
        console.log('response: ', response);
        if (response?.profileImage) {
          let objectURL =
            'data:image/jpeg;base64,' + response?.profileImage?.data;
          this.profileURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
        this.dataUser = response;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.alertType = AlertType.ALERT_WARNING;
          this.okText = this.translate.instant('message.timeout.cta');
          this.messageAlert = this.translate.instant('message.timeout.title');
          this.descriptionAlert = this.translate.instant(
            'message.timeout.description'
          );
          this.isExpiredToken = true;
        } else {
          console.log('Error Occured during downloading: ', error);
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  getUserDateCreation(createdAt: string): string {
    return moment(createdAt).fromNow().toLocaleLowerCase();
  }

  getCountriesAndPrefixPhoneWorld() {
    this.flagService.getDialCodeAndCountryFlag().subscribe(
      (response: { data: any }) => {
        this.countryAndFlagData = response.data;
        this.prefixPhoneData = response.data?.filter((prefix: any) => {
          return prefix?.dialCode !== undefined && prefix?.dialCode !== ' ';
        });
        // Only take the unique prefix phone
        this.prefixPhoneData = _.uniqWith(this.prefixPhoneData, _.isEqual);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.alertType = AlertType.ALERT_WARNING;
          this.okText = this.translate.instant('message.timeout.cta');
          this.messageAlert = this.translate.instant('message.timeout.title');
          this.descriptionAlert = this.translate.instant(
            'message.timeout.description'
          );
          this.isExpiredToken = true;
        } else {
          console.log('enable to retrieve data country and flag ' + error);
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  handleOnCountryFlagSelected(country: string) {
    if (!!this.countryAndFlagData?.length) {
      let countryFlag = this.countryAndFlagData?.find(
        (countryFlag: any) => countryFlag?.name === country
      );
      return countryFlag?.flag;
    }
  }

  getRoleName(role: any) {
    switch (role?.name) {
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

  getUserColorRole(role: any) {
    switch (role?.name) {
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

  handleOnEdit() {
    this.enableEdit = false;
    //  this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}/${Pages.USER}/${Pages.CREATE}`])
    //update user informations
    this.router.navigate([
      `${Pages.WAREHOUSE}/${Pages.DASHBOARD}/${Pages.USER}/${Pages.EDIT}`,
    ]);
  }

  handleOnSave() {
    this.enableEdit = true;
  }

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

  getFormatDateOfBirth(dateOfBirth: string): string {
    return moment(dateOfBirth).format('L');
  }

  getFormatUserLastLogin(lastLogin: string): string {
    return moment(lastLogin).format(this.dateFormat);
  }

  getCapitalizeUsername(username: string): string {
    return username?.charAt(0).toUpperCase() + username?.slice(1);
  }

  handleOnFlagByPrefixCode(prefix: string) {
    if (!!this.countryAndFlagData?.length) {
      let countryFlag = this.countryAndFlagData?.find(
        (countryFlag: any) => '+' + countryFlag?.dialCode === prefix
      );
      return countryFlag?.flag;
    }
  }

  handleOnOkModal(event: string) {
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    window.location.reload();
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }
}
