import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { AuthentificationService } from 'src/app/services/auth/authentification.service';
import { FlagService } from 'src/app/services/flag.service';
import { ImageService } from 'src/app/services/image.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
@Component({
  selector: 'warehouse-register-step-three',
  templateUrl: './register-step-three.component.html',
  styleUrls: [
    './register-step-three.component.scss',
    '../register-step-one/register-step-one.component.scss',
  ],
})
export class RegisterStepThreeComponent implements OnInit {
  validateForm!: FormGroup;
  isAuth: boolean = false;
  isNoAuth: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  messageNotification: string = '';
  countryAndFlagData: any;
  dateFormat = 'dd/MM/YYYY';
  acceptPictures: string[] = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.tif',
    '.tiff',
    '.bmp',
    '.webp',
  ];

  selectedValue = { label: 'User', value: 'user' };
  steps: string[] = [
    'register.step.information',
    'register.step.verification',
    'register.step.registration',
  ];
  currentStep: number = 2;
  selectedFile: any;
  imgURL: any;
  showbuttonUpload: boolean = false;
  countrySelected: string = '';
  countryDialCode: string = '';
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authentificationService: AuthentificationService,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private flagService: FlagService,
    private imageService: ImageService,
    private translate: TranslateService
  ) {
    this.checkIfUserIsAlreadyLogged();
  }

  ngOnInit(): void {
    this.initForm();
    this.getWorldCountries();
  }

  getWorldCountries() {
    this.flagService.getDialCodeAndCountryFlag().subscribe(
      (response: { data: any }) => {
        this.countryAndFlagData = response.data;
      },
      (error: HttpErrorResponse) => {
        console.log('enable to retrieve data country and flag ' + error);
      }
    );
  }

  handleOnKeyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  initForm() {
    this.validateForm = this.fb.group({
      image: '',
      dateOfBirth: ['', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
      ],
      country: ['', [Validators.required]],
    });
  }

  checkIfUserIsAlreadyLogged() {
    let user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    if (user?.token || user?.user) {
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
    }
  }

  getCountryDialCode(): string {
    return this.countryDialCode.includes('+')
      ? this.countryDialCode
      : '+' + this.countryDialCode;
  }

  submitForm() {
    let user = JSON.parse(
      localStorage.getItem(Utils.WAREHOUSE_JWT_TOKEN) as string
    );

    if (!!this.imgURL?.length) {
      this.handleOnUploadImageProfile(user?.user?.userId);
    }
    let userData = {
      dateOfBirth: moment(
        this.validateForm.controls['dateOfBirth']?.value
      ).format('L'),
      phonePrefix: this.getCountryDialCode(),
      phoneNumber: this.validateForm.controls['phoneNumber']?.value,
      country: this.validateForm.controls['country']?.value,
    };
    this.authentificationService
      .userRegisterStepThree(
        userData,
        Utils.WAREHOUSE_STEP_THREE,
        user?.user?.username
      )
      .subscribe(
        (response: any) => {
          this.successAlertType(response?.message);
          // Remove the localStorage leave in step 2 to identy the user registering.
          this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
          // Remove the remember, if it was present in the past
          localStorage.removeItem(Utils.WAREHOUSE_REMEMBER_ME);
        },
        (error: HttpErrorResponse) => {
          this.errorAlertType(error.error.message);
        }
      );
  }

  errorAlertType(message: string): void {
    this.isNoAuth = true;
    this.alertType = AlertType.ALERT_ERROR;
    this.messageAlert = message;
  }

  successAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = message;
  }

  successNotificationType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageNotification = message;
  }

  handleOnLogin() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }

  handleOnChangeInput() {
    // If the alert incorrect password is opened,
    // when the user point the password/confirm password, the alert disappear.
    if (this.isNoAuth) {
      this.isNoAuth = !this.isNoAuth;
    }
  }

  handleOnUploadImageProfile(userId: string) {
    // Instantiate a FormData to store form fields and encode the file
    let uploadData = new FormData();
    // Add file content to prepare the request
    uploadData.append('file', this.selectedFile);

    this.imageService.uploadImageProfile(uploadData, userId).subscribe(
      (response: any) => {
        this.successNotificationType(response?.message);
      },
      (error: HttpErrorResponse) => {
        console.log('Error Occured duringng saving: ', error);
        this.errorAlertType(error?.message || error?.error?.message);
      }
    );
  }

  handleOnFileChanged(event: any) {
    this.handleOnChangeInput();
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
    if (this.checkFileValidation(this.selectedFile)) {
      this.showbuttonUpload = true;
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imgURL = reader.result;
      };
    }
  }

  checkFileValidation(file: File): boolean {
    const fileExt: string =
      '.' + file.name.split('.')[file.name.split('.').length - 1].toLowerCase();
    if (this.acceptPictures.includes(fileExt)) {
      if (file.size < 5000000) {
        return true;
      } else {
        this.errorAlertType(this.translate.instant('validations.upload.size'));
        return false;
      }
    } else {
      this.errorAlertType(
        this.translate.instant('validations.upload.extensions')
      );
      return false;
    }
  }

  handleOnRemoneImage() {
    this.imgURL = '';
    this.showbuttonUpload = false;
  }

  handleOnChangeDate(date: any) {
    console.log('handleOnChangeDate: ', date);
  }

  handleOnFlagSelected() {
    if (!!this.countryAndFlagData?.length) {
      let country = this.countryAndFlagData?.find(
        (countryFlag: any) => countryFlag?.name === this.countrySelected
      );
      return country?.flag;
    }
  }

  handleOnSelectCountry(selectedCountry: string) {
    this.countrySelected = selectedCountry;
    if (!!this.countryAndFlagData?.length) {
      let country = this.countryAndFlagData?.find(
        (countryFlag: any) => countryFlag?.name === this.countrySelected
      );
      this.countryDialCode = country?.dialCode;
    }
  }
}
