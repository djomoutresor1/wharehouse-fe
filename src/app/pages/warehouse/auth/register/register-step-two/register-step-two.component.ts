import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Observable } from 'rxjs';
import { selectUsers} from './../../../../../reducers/action/user.selectors';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { PathParams } from 'src/app/shared/enums/path-params-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { ResponseResetModel } from 'src/model/auth/response/response-reset-model';

@Component({
  selector: 'warehouse-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: ['./register-step-two.component.scss','../register-step-one/register-step-one.component.scss']
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

  idLinkResetPassword: any;
  expirationLink: any;
  verifyType: any;
  isExpiredLink: boolean = false;
  user!: ResponseResetModel;
  isResetPassword: boolean = false;
  users : Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private authorizationService: AuthorizationService,
    private store:Store<ResponseResetModel>
  ) {
    this.idLinkResetPassword = this.route.snapshot.queryParamMap.get(
      PathParams.ID_LINK_RESET_VERIFICATION_EMAIL
    );
    this.expirationLink = this.route.snapshot.queryParamMap.get(
      PathParams.EXPIRATION_LINK
    );
    this.verifyType = this.route.snapshot.queryParamMap.get(
      PathParams.VERIFY_TYPE
    );
    this.users = this.store.pipe(select(selectUsers));
    this.users.subscribe(res => console.log(res));
  }

  ngOnInit(): void {
    this.checkIfIdLinkResetPasswordAndVerifyTypeAreCorrects()
  }

  onGoToStepThree(){
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.REGISTERSTEP3}`]);
  }

  onRetrieveUser(){
    return this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
  }

  
  checkIfIdLinkResetPasswordAndVerifyTypeAreCorrects() {
    this.authorizationService
      .userVerifyLink(this.idLinkResetPassword, this.verifyType)
      .subscribe(
        (response: ResponseResetModel) => {
          this.user = response;
          localStorage.setItem('response', JSON.stringify(response));
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

}

