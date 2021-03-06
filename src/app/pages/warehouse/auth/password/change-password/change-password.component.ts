import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { ProfilService } from 'src/app/services/profil.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { ResponseModel } from 'src/model/auth/response/response-model';
import { ResponseUserModel } from 'src/model/auth/response/response-user-model';
import { BreadcrumbItemsModel } from 'src/model/utils/breadcrumb-items-model';

@Component({
  selector: 'warehouse-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  validateForm!: FormGroup;
  oldPasswordVisible = false;
  oldPassword?: string;
  passwordVisible = false;
  password: string = '';
  confirmPasswordVisible = false;
  confirmPassword?: string;
  isError: boolean = false;
  isSuccess: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  okText: string = '';
  descriptionAlert: string = '';
  user: any;
  isSecurePassword: boolean = false;
  isExpiredToken: boolean = false;

  breadcrumbItems!: BreadcrumbItemsModel;
  profileURL: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authorizationService: AuthorizationService,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private translate: TranslateService,
    private profilService: ProfilService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initComponent();
    this.initForm();
    this.getInfosUser();
  }

  initComponent() {
    this.user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    console.log('currentLang: ', this.translate.currentLang);
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
        url: 'dashboard/my-profile',
      },
      children: [
        {
          title: this.translate.instant('changePassword.title'),
        },
      ],
    };
  }

  getInfosUser() {
    this.profilService.getUserInfos(this.user?.userId).subscribe(
      (response: ResponseUserModel) => {
        if (response?.profileImage) {
          let objectURL =
            'data:image/jpeg;base64,' +
            response?.profileImage?.find(
              (profile) => profile.imageType === Utils.WAREHOUSE_AVATAR_IMAGE
            )?.data;
          this.profileURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
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
          console.log('Error Occured duringng downloading: ', error);
          this.errorAlertType(error?.error || error?.error?.message);
        }
      }
    );
  }

  initForm() {
    this.validateForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  handleOnChangePassword() {
    this.password = this.validateForm.controls['password']?.value;
  }

  submitForm() {
    let oldPassword = this.validateForm.controls['oldPassword']?.value;
    let password = this.validateForm.controls['password']?.value;
    let confirmPassword = this.validateForm.controls['confirmPassword']?.value;
    if (this.checkValidationsPassword(oldPassword, password, confirmPassword)) {
      this.authorizationService
        .userChangePassword(this.user?.userId, oldPassword, password)
        .subscribe(
          (response: ResponseModel) => {
            this.successAlertType(response?.message);
          },
          (error: HttpErrorResponse) => {
            if (error.status === 403) {
              // Expiration token
              this.alertType = AlertType.ALERT_WARNING;
              this.okText = this.translate.instant('message.timeout.cta');
              this.messageAlert = this.translate.instant(
                'message.timeout.title'
              );
              this.descriptionAlert = this.translate.instant(
                'message.timeout.description'
              );
              this.isExpiredToken = true;
            } else {
              console.log('Error Occured duringng downloading: ', error);
              this.errorAlertType(error?.error || error?.error?.message);
            }
          }
        );
    }
  }

  checkValidationsPassword(
    oldPassword: string,
    password: string,
    confirmPassword: string
  ): boolean {
    let message = '';
    if (oldPassword === password) {
      message = this.translate.instant('message.changePassword.newPassword');
      this.errorAlertType(message);
    }
    if (confirmPassword !== password) {
      message = this.translate.instant(
        'message.changePassword.confirmPassword'
      );
      this.errorAlertType(message);
    }
    return !!message?.length ? false : true;
  }

  successAlertType(message: string): void {
    this.isSuccess = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = message;
    this.okText = this.translate.instant(
      'message.changePassword.success.title'
    );
    this.descriptionAlert = this.translate.instant(
      'message.changePassword.success.description'
    );
    // First cancel the token in localStorage
    // because the user could refresh the page without click in the OK button in modal confirmation
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
  }

  errorAlertType(message: string): void {
    this.isError = true;
    this.alertType = AlertType.ALERT_ERROR;
    this.messageAlert = message;
  }

  handleOnNavigate(url: String) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }

  handleOnChangeInput() {
    // If the alert incorrect password is opened,
    // when the user point the password/confirm password, the alert disappear.
    if (this.isError) {
      this.isError = !this.isError;
    }
  }

  handleOnOkModal(event: string) {
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    window.location.reload();
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }

  handleOnNotifyPassword(event: boolean) {
    this.isSecurePassword = event;
  }

  handleOnBack() {
    this.router.navigate([
      `${Pages.WAREHOUSE}/${Pages.DASHBOARD}/${Pages.PROFILE}`,
    ]);
  }
}
