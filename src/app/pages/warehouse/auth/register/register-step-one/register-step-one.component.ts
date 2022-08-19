import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { ResponseRegisterModel } from 'src/model/auth/response/response-register-model';
import { HttpErrorResponse } from '@angular/common/http';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';

@Component({
  selector: 'warehouse-register-step-one',
  templateUrl: './register-step-one.component.html',
  styleUrls: ['./register-step-one.component.scss'],
})
export class RegisterStepOneComponent extends WarehouseBaseComponent implements OnInit {
  passwordVisible = false;
  password: string = '';
  confirmPasswordVisible = false;
  confirmPassword?: string;
  isSecurePassword: boolean = false;
  isMailSent: boolean = false;
  email: string = '';
  idLinkResetPassword: any;
  expirationLink: any;
  verifyType: any;
  isExpiredLink: boolean = false;
  isResetPassword: boolean = false;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.fb.group({
      fullName: [
        null,
        [Validators.required, Validators.min(5), Validators.max(25)],
      ],
      username: [
        null,
        [Validators.required, Validators.min(5), Validators.max(15)],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      role: [null, [Validators.required]],
      gender: [null, [Validators.required]],
    });
  }

  submitForm() {
    let userData = {
      fullname: this.validateForm.controls['fullName']?.value,
      username: this.validateForm.controls['username']?.value.toLowerCase(),
      email: this.validateForm.controls['email']?.value,
      password: this.validateForm.controls['password']?.value,
      confirmPassword: this.validateForm.controls['confirmPassword']?.value,
      role: this.validateForm.controls['role']?.value,
      gender: this.validateForm.controls['gender']?.value,
    };
    // Verify the password and confirm password and username criteria
    let message = this.handleOnCheckValidation(
      userData.username,
      userData.password,
      userData.confirmPassword
    );
    this.email = this.validateForm.controls['email'].value;

    if (!!message?.length) {
      this.errorAlertType(message);
    } else {
      this.authentificationService
        .userRegisterStepOne(userData, Utils.WAREHOUSE_STEP_ONE)
        .subscribe(
          (response: ResponseRegisterModel) => {
            this.isMailSent = true;
            this.currentStep = 1;
          },
          (error: HttpErrorResponse) => {
            if (error.status === 403) {
              // Expiration token
              this.expirationToken();
            } else {
              this.isResetPassword = true;
              this.errorAlertType(error?.error || error?.error?.message);
            }
          }
        );
    }
  }

  handleOnCheckValidation(
    username: string,
    password: string,
    confirmPassword: string
  ): string {
    let message = '';
    if (confirmPassword !== password) {
      message = this.translate.instant('validations.confirm.password');
      return message;
    } else if (username?.length <= 7) {
      message = this.translate.instant('validations.username');
      return message;
    } else {
      return message;
    }
  }

  handleOnChangePassword() {
    this.password = this.validateForm.controls['password']?.value;
  }

  handleOnNotifyPassword(event: boolean) {
    this.isSecurePassword = event;
  }

  handleOnOkModal(event: string) {
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    window.location.reload();
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }
}
