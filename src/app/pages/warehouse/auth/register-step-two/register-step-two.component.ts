import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/auth/authentification.service';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { ResponseRegisterModel, ResponseRegisterModelTwo } from 'src/model/auth/response/response-register-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from 'src/app/shared/enums/auth-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { UserRegisterModelStepTwo } from 'src/model/auth/resquest/user-register-model';

@Component({
  selector: 'warehouse-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: ['./register-step-two.component.scss','../register/register.component.scss']
})

export class RegisterStepTwoComponent implements OnInit {
  validateForm!: FormGroup;
  isAuth: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  countries:any;

  selectedValue = { label: 'User', value: 'user' };
  steps: string[] = [
    'User Informations',
    'Verification Email',
    'Registration User',
  ];
  currentStep: number = 0;
  selectedFile: any;
  event1: any;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  showbuttonUpload: boolean = false;
  showInputUpload: boolean = true;


  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authentificationService: AuthentificationService,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private http: HttpClient,
  ) {
    this.checkIfUserIsAlreadyLogged();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.fb.group({
      fullName: [
        null,
        [Validators.required, Validators.min(5), Validators.max(25)],
      ],
      userName: [
        null,
        [Validators.required, Validators.min(5), Validators.max(15)],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      role: [null, [Validators.required]],
    });
  }

  checkIfUserIsAlreadyLogged() {
    let user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    if (user?.token) {
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
    }
  }


  submitForm() {
    let userData = {
      dateOfBirth: this.validateForm.controls['dateOfBirth']?.value,
      phoneNumber: this.validateForm.controls['phoneNumber']?.value,
      country: this.validateForm.controls['country']?.value,
    };
      this.authentificationService
        .userRegisterStepTwo(userData, Utils.WAREHOUSE_STEP_TWO)
        .subscribe(
          (response: any) => {
            this.successAlertType(response?.message);
          },
          (error: HttpErrorResponse) => {
            this.errorAlertType(error.error.message);
          }
        );
    }
  



  errorAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_ERROR;
    this.messageAlert = message;
  }

  successAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = message;
    setTimeout(() => {
      this.isAuth = false;
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
    }, 2000);
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

  onUploadFotoProfile() {
    const uploadData = new FormData();
    this.showbuttonUpload = false;
    this.showInputUpload = false;
    uploadData.append('myFile', this.selectedFile, this.selectedFile?.name);

    this.http
      .post(`${this.apiServerUrl}${Auth.WAREHOUSE_UPLOAD_IMAGE}`, uploadData)
      .subscribe(
        (res) => {
          console.log(res);
          this.receivedImageData = res;
          this.base64Data = this.receivedImageData.pic;
          this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
        },
        (err) => console.log('Error Occured duringng saving: ' + err)
      );
  }


  onFileChanged(event: any) {
    //   this.onUploadFotoProfile();
    this.showbuttonUpload = true;
    this.showInputUpload = false;
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

}
