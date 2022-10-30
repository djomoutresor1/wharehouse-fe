import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { PathParams } from 'src/app/shared/enums/path-params-enums';
import { ResponseModel } from 'src/model/auth/response/response-model';
import { ResponseResetModel } from 'src/model/auth/response/response-reset-model';
import { ResponseUserModel } from 'src/model/auth/response/response-user-model';
@Component({
  selector: 'warehouse-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: [
    './register-step-two.component.scss',
    '../register-step-one/register-step-one.component.scss',
  ],
})
export class RegisterStepTwoComponent extends WarehouseBaseComponent implements OnInit {
  size: NzButtonSize = 'large';
  idLinkVerifyEmail: any;
  expirationLink: any;
  verifyType: any;
  isExpiredLink: boolean = false;
  isVerifyEmail: boolean = false;
  userActivateStatusType: boolean = false;
  userVerified!: ResponseResetModel;

  constructor(injector: Injector) {
    super(injector);
    this.idLinkVerifyEmail = this.route.snapshot.queryParamMap.get(
      PathParams.ID_LINK_VERIFICATION_EMAIL
    );
    this.expirationLink = this.route.snapshot.queryParamMap.get(
      PathParams.EXPIRATION_LINK
    );
    this.verifyType = this.route.snapshot.queryParamMap.get(
      PathParams.VERIFY_TYPE
    );
  }

  override ngOnInit(): void {
    this.currentStep = 1;
    this.initComponent();
    this.checkIfIdLinkVerifyEmailAndVerifyTypeAreCorrects();
  }

  initComponent() {
    let currentLang = null;
    currentLang = this.translate.currentLang;
    if (currentLang === undefined) {
      currentLang =
        this.warehouseLocalStorage.WarehouseGetLanguageLocalStorage();
    }
    this.translate.use(currentLang as string);
  }

  handleOnGoToStepThree() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.REGISTER_STEP_3}`]);
  }

  handleOnGoToLogin() {
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }

  onRetrieveUser() {
    return this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
  }

  checkIfIdLinkVerifyEmailAndVerifyTypeAreCorrects() {
    this.authorizationService
      .userVerifyLink(this.idLinkVerifyEmail, this.verifyType)
      .subscribe(
        (response: ResponseResetModel) => {
          console.log('response', response);
          this.warehouseLocalStorage.WarehouseSetTokenLocalStorage(response);
          this.userVerified = response;
          this.checkIfExpirationLinkIsCorrect();
          if (!this.isExpiredLink && !this.isVerifyEmail) {
            this.handleOnActivateStatusUser();
            setTimeout(() => {
              this.handleOnGetUserInfos(this.user?.userId);
            }, 2000);
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 403) {
            // Expiration token
            this.expirationToken();
          } else {
            this.errorAlertType(error?.error.message);
          }
        }
      );
  }

  handleOnActivateStatusUser() {
    this.profilService.onActivateUser(this.user?.userId).subscribe(
      (response: ResponseModel) => {
        console.log('response: ', response);
        this.successAlertType(response?.message);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          console.log('Error: ', error);
          this.isVerifyEmail = true;
          this.errorAlertType(error?.error?.message);
        }
      }
    );
  }

  handleOnGetUserInfos(userId: string) {
    this.profilService.getUserInfos(userId).subscribe(
      (response: ResponseUserModel) => {
        console.log('response: ', response);
        this.userActivateStatusType = response.userInfo?.adminUser;
        if (!this.userActivateStatusType) {
          this.handleOnGoToStepThree();
        }
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

  checkIfExpirationLinkIsCorrect() {
    let now = new Date().getTime();
    let expiredLinkUrl = new Date(this.expirationLink).getTime();
    let expiredLinkUser = new Date(this.userVerified?.expiryDate).getTime();
    // First verify if the expired date in url is same with expired date user's in db
    if (this.verifyTheCorrectDate(expiredLinkUrl, expiredLinkUser)) {
      // Compare the expired date with the current date
      if (expiredLinkUrl > now) {
        this.isExpiredLink = false;
      } else {
        this.isExpiredLink = true;
        this.errorAlertType(
          this.translate.instant('validations.link.expiration')
        );
      }
    } else {
      this.isExpiredLink = true;
      this.errorAlertType(this.translate.instant('validations.link.date'));
    }
  }

  verifyTheCorrectDate(
    expiredLinkUrl: number,
    expiredLinkUser: number
  ): boolean {
    // We have the precision lost before the last fourth numbers
    // Then, first, i will remove the last fourth numbers in both dates
    let correctExpiredLinkUrl = expiredLinkUrl
      .toString()
      .slice(0, expiredLinkUrl.toString().length - 4);
    let correctExpiredLinkUser = expiredLinkUser
      .toString()
      .slice(0, expiredLinkUser.toString().length - 4);

    return correctExpiredLinkUrl === correctExpiredLinkUser ? true : false;
  }

  handleOnSendLink() {}

  handleOnOkModal(event: string) {
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    window.location.reload();
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }
}
