import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { BreadcrumbItemsModel } from 'src/model/utils/breadcrumb-items-model';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ResponseUserModel } from 'src/model/auth/response/response-user-model';
import { ResponseFileModel } from 'src/model/auth/response/response-file-model';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { ViewService } from 'src/app/services/view-file.service';
@Component({
  selector: 'warehouse-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends WarehouseBaseComponent implements OnInit {
  @Input() mode: string = '';
  @Input() userProfile!: ResponseUserModel;

  userLocalStorage: any;
  breadcrumbItems!: BreadcrumbItemsModel;
  coverURL: any;
  avatarURL: any;
  countryAndFlagData: any[] = [];
  prefixPhoneData: any[] = [];
  enableEdit: boolean = true;
  dataUser: any;

  constructor(injector: Injector, private viewService: ViewService) {
    super(injector);
  }

  override ngOnInit(): void {
    this.initComponent();
    this.userLocalStorage = this.userProfile
      ? this.userProfile
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
        if (!!response?.profileImage?.length) {
          this.getDefaultObjectImageURL(response?.profileImage);
        }
        this.dataUser = response;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
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
          this.expirationToken();
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
    this.router.navigate(
      [`${Pages.WAREHOUSE}/${Pages.DASHBOARD}/${Pages.MANAGE_ACCOUNT}`],
      { queryParams: { tabNumber: 0 } }
    );
  }

  getFormatDateOfBirth(dateOfBirth: string): string {
    return moment(dateOfBirth).format('L');
  }

  getFormatUserLastLogin(lastLogin: string): string {
    return moment(lastLogin).format(this.dateFormatThree);
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

  onViewProfilePdf() {
    this.viewProfilService.getPdfViewer().subscribe(
      (response: any) => {
        console.log(response);
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
}
