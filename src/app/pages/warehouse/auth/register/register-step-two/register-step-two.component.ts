import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { ProfilService } from 'src/app/services/profil.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { PathParams } from 'src/app/shared/enums/path-params-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { ResponseModel } from 'src/model/auth/response/response-model';
import { ResponseResetModel } from 'src/model/auth/response/response-reset-model';
import { ResponseStatusActivationModel } from 'src/model/auth/response/response-status-activation-model';
@Component({
  selector: 'warehouse-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: [
    './register-step-two.component.scss',
    '../register-step-one/register-step-one.component.scss',
  ],
})
export class RegisterStepTwoComponent implements OnInit {
  currentStep: number = 1;
  size: NzButtonSize = 'large';
  isAuth: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  role: string = '';
  rolesList = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
    { label: 'Moderator', value: 'moderator' },
  ];
  steps: string[] = [
    'register.step.information',
    'register.step.verification',
    'register.step.registration',
  ];

  idLinkVerifyEmail: any;
  expirationLink: any;
  verifyType: any;
  isExpiredLink: boolean = false;
  user!: ResponseResetModel;
  isVerifyEmail: boolean = false;
  userActivateStatusType: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private authorizationService: AuthorizationService,
    private profilService: ProfilService,
    private translate: TranslateService
  ) {
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

  ngOnInit(): void {
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
          // Case where the user is added by the admin and not yet present the in users table, but in the users_tmp table
          if (response?.user == null) {
            this.handleOnFindUser(response?.userId);
          } else {
            this.warehouseLocalStorage.WarehouseSetTokenLocalStorage(response);
            this.user = response;
            this.checkIfExpirationLinkIsCorrect();
            if (!this.isExpiredLink && !this.isVerifyEmail) {
              this.handleOnActivateStatusUser();
            }
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.errorAlertType(error?.error.message);
          }
        }
      );
  }

  handleOnFindUser(userId: string) {
    this.authorizationService.userFindByUserId(userId).subscribe(
      (response: ResponseModel) => {
        this.user = {
          link: this.idLinkVerifyEmail,
          expiryDate: this.expirationLink,
          verifyType: this.verifyType,
          userId: userId,
          user: {
            fullname: response?.object?.fullname,
            email: response?.object?.email,
            role: response?.object?.roles,
            username: response?.object?.username,
            active: response?.object?.active,
            lastLogin: response?.object?.lastLogin,
            userId: userId,
          },
        };
        this.warehouseLocalStorage.WarehouseSetTokenLocalStorage(this.user);
        this.checkIfExpirationLinkIsCorrect();
        if (!this.isExpiredLink && !this.isVerifyEmail) {
          this.handleOnActivateStatusUser();
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  handleOnActivateStatusUser() {
    this.profilService.onActivateUser(this.user?.userId).subscribe(
      (response: ResponseStatusActivationModel) => {
        console.log('response: ', response);
        console.log('response: ', response?.adminUser);
        this.userActivateStatusType = response?.adminUser;
        if(this.userActivateStatusType) {

        } else {
          this.successAlertType(response?.message);
        }
      },
      (error: HttpErrorResponse) => {
        console.log('Error: ', error);
        this.isVerifyEmail = true;
        this.errorAlertType(error?.error?.message);
      }
    );
  }

  successAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = message;
    setTimeout(() => {
      this.handleOnGoToStepThree();
    }, 2000);
  }

  checkIfExpirationLinkIsCorrect() {
    let now = new Date().getTime();
    let expiredLinkUrl = new Date(this.expirationLink).getTime();
    let expiredLinkUser = new Date(this.user?.expiryDate).getTime();
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

  errorAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_ERROR;
    this.messageAlert = message;
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
}
