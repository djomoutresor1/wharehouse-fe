import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
import { ResponseFileModel } from 'src/model/auth/response/response-file-model';
import { StatusType } from 'src/app/shared/enums/status-type-enums';
import { ViewService } from 'src/app/services/view-file.service';
@Component({
  selector: 'warehouse-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() mode: string = '';
  @Input() user!: ResponseUserModel;

  userLocalStorage: any;
  breadcrumbItems!: BreadcrumbItemsModel;
  isAuth: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  coverURL: any;
  avatarURL: any;
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
    private flagService: FlagService,
    private viewService: ViewService,
    
  ) {}

  ngOnInit(): void {
    this.initComponent();
    this.userLocalStorage = this.user
      ? this.user
      : this.warehouseLocalStorage?.WarehouseGetTokenLocalStorage();
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
        if (!!response?.profileImage?.length) {
          this.getDefaultObjectImageURL(response?.profileImage);
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

  getDefaultObjectImageURL(profileImage: ResponseFileModel[]) {
    let objectAvatarURL = profileImage?.find(
      (profile) => profile.imageType === Utils.WAREHOUSE_AVATAR_IMAGE
    )?.data;
    this.avatarURL =
      objectAvatarURL === undefined
        ? ''
        : this.sanitizer.bypassSecurityTrustUrl(
            Utils.WAREHOUSE_DATA_IMAGE_BASE64 + objectAvatarURL
          );
    let objectCoverURL = profileImage?.find(
      (profile) => profile.imageType === Utils.WAREHOUSE_COVER_IMAGE
    )?.data;
    this.coverURL =
      objectCoverURL === undefined
        ? ''
        : this.sanitizer.bypassSecurityTrustUrl(
            Utils.WAREHOUSE_DATA_IMAGE_BASE64 + objectCoverURL
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

  getUserStatus(status: string): string {
    switch (status) {
      case StatusType.STATUS_ACTIVE:
        return AlertType.ALERT_SUCCESS;
      case StatusType.STATUS_DISABLED:
        return AlertType.ALERT_ERROR;
      case StatusType.STATUS_PENDING:
        return AlertType.ALERT_WARNING;
      default:
        return AlertType.ALERT_WARNING;
    }
  }

  formatUserStatus(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }
  
  getUserRoleName(role: any) {
    switch (role?.name) {
      case Utils.ROLE_ADMIN:
        return Utils.ADMINS;
      case Utils.ROLE_MODERATOR:
        return Utils.MODERATOR;
      case Utils.ROLE_USER:
        return Utils.USER;
      default:
        return Utils.USER;
    }
  }

  getUserColorRole(role: any) {
    switch (role?.name) {
      case Utils.ROLE_USER:
        return '#0096c8';
      case Utils.ROLE_MODERATOR:
        return '#ffc107';
      case Utils.ROLE_ADMIN:
        return '#2a7a39';
      default:
        return '#0096c8';
    }
  }

  getUserRoleIcon(role: string) {
    switch (role) {
      case Utils.ROLE_USER:
        return 'user';
      case Utils.ROLE_MODERATOR:
        return 'user-switch';
      case Utils.ROLE_ADMIN:
        return 'team';
      default:
        return 'user';
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

  onViewProfilePdf(){
    this.viewService.getPdfViewer().subscribe(
      (response: any) => {
          console.log(response)
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
      })
  }
}
