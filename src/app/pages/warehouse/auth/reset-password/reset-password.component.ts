import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { PathParams } from 'src/app/shared/enums/path-params-enums';
import { ResponseModel } from 'src/model/auth/response/response-model';
import { ResponseResetModel } from 'src/model/auth/response/response-reset-model';

@Component({
  selector: 'warehouse-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  validateForm!: FormGroup;
  isAuth: boolean = false;
  isResetPassword: boolean = false;
  passwordVisible = false;
  password?: string;
  confirmPasswordVisible = false;
  confirmPassword?: string;
  alertType: string = '';
  messageAlert: string = '';
  descriptionAlert: string = '';
  user!: ResponseResetModel;

  idLinkResetPassword: any;
  expirationLink: any;
  verifyType: any;

  isExpiredLink: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authorizationService: AuthorizationService
  ) {
    this.idLinkResetPassword = this.route.snapshot.queryParamMap.get(
      PathParams.ID_LINK_RESET_PASSWORD
    );
    this.expirationLink = this.route.snapshot.queryParamMap.get(
      PathParams.EXPIRATION_LINK
    );
    this.verifyType = this.route.snapshot.queryParamMap.get(
      PathParams.VERIFY_TYPE
    );
  }

  ngOnInit(): void {
    this.initForm();
    this.checkIfIdLinkResetPasswordAndVerifyTypeAreCorrects();
  }

  initForm() {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  checkIfIdLinkResetPasswordAndVerifyTypeAreCorrects() {
    this.authorizationService
      .userVerifyLink(this.idLinkResetPassword, this.verifyType)
      .subscribe(
        (response: ResponseResetModel) => {
          this.user = response;
          this.checkIfExpirationLinkIsCorrect();
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.isResetPassword = true;
            this.errorAlertType(error?.error.message);
          }
        }
      );
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
          'The link to reset your password is expired. Try resend the new link to complete the operation.'
        );
      }
    } else {
      this.isExpiredLink = true;
      this.errorAlertType(
        'The expired date that you are providing to reset your password is not correct. Try resend the new link to complete the operation.'
      );
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

  submitForm() {
    this.isAuth = false;
    let password = this.validateForm.controls['password']?.value;
    let confirmPassword = this.validateForm.controls['confirmPassword']?.value;
    if (confirmPassword !== password) {
      let message = "Password and confirm password don't match. Try again.";
      this.errorAlertType(message);
    } else {
      this.authorizationService
        .userResetPassword(this.user?.user?.email, password)
        .subscribe(
          (response: ResponseModel) => {
            this.successNotificationType(response);
          },
          (error: HttpErrorResponse) => {
            this.errorAlertType(error.error.message);
          }
        );
    }
  }

  successNotificationType(userInfo: ResponseModel): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = `Well done ${userInfo?.object?.fullname}`;
    this.descriptionAlert = userInfo?.message;
    setTimeout(() => {
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
    }, 2000);
  }

  errorAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_ERROR;
    this.messageAlert = message;
  }

  handleOnSendLink() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.FORGOT_PASSWORD}`]);
  }

  handleOnLogin() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }

  handleOnChangeInput() {
    // If the alert incorrect password is opened,
    // when the user point the password/confirm password, the alert disappear.
    if (this.isAuth) {
      this.isAuth = !this.isAuth;
    }
  }
}
