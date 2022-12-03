import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  Injector,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { ResponseFileModel } from 'src/model/auth/response/response-file-model';
import { ResponseUserModel } from 'src/model/auth/response/response-user-model';
import { ResponseOrganizationModel } from 'src/model/organization/response/response-organization-model';

@Component({
  selector: 'warehouse-organization-show',
  templateUrl: './organization-show.component.html',
  styleUrls: ['./organization-show.component.scss'],
})
export class OrganizationShowComponent
  extends WarehouseBaseComponent
  implements OnInit
{
  @Input() organizationDatatable!: ResponseOrganizationModel;
  @Input() visibleDrawerShow: boolean = false;
  @Output() handleOnNotifyCloseDrawer: EventEmitter<any> =
    new EventEmitter<any>();

  referent!: ResponseUserModel;
  titleDrawer: string = '';
  sizeDrawer: number = 700;
  sizeDrawerReferent: number = 400;
  countryAndFlagData: any[] = [];
  visibleDrawerShowReferent: boolean = false;

  avatarURL: any;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    this.initComponent();
    this.getCountriesAndPrefixPhoneWorld();
  }

  initComponent() {
    this.titleDrawer = this.organizationDatatable.organization.organizationName;
    this.handleOnGetReferent(this.organizationDatatable.organization.referent);
  }

  handleOnGetReferent(userId: string) {
    this.profilService.getUserInfos(userId).subscribe(
      (response: ResponseUserModel) => {
        this.referent = response;
        console.log('referent: ', this.referent);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          console.log('Error: ', error);
          this.errorAlertType(error?.error?.message);
        }
      }
    );
  }

  getCountriesAndPrefixPhoneWorld() {
    this.flagService.getDialCodeAndCountryFlag().subscribe(
      (response: { data: any }) => {
        this.countryAndFlagData = response.data;
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

  handleOnGetProfileImage(profileImage: ResponseFileModel[]) {
    let objectAvatarURL = profileImage?.find(
      (profile) => profile.imageType === Utils.WAREHOUSE_AVATAR_IMAGE
    )?.data;
    this.avatarURL =
      objectAvatarURL === undefined
        ? ''
        : this.sanitizer.bypassSecurityTrustUrl(
            Utils.WAREHOUSE_DATA_IMAGE_BASE64 + objectAvatarURL
          );
  }

  handleOnShowReferent() {
    this.visibleDrawerShowReferent = true;
    this.handleOnGetProfileImage(this.referent.profileImage);
  }

  handleOnCloseDrawer() {
    this.handleOnNotifyCloseDrawer.emit();
  }

  handleOnCloseDrawerReferent() {
    this.visibleDrawerShowReferent = false;
  }
}
