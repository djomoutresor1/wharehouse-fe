import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FlagService } from 'src/app/services/flag.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { BreadcrumbItemsModel } from 'src/model/utils/breadcrumb-items-model';
import * as _ from 'lodash';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ResponseUserInsertModel } from 'src/model/dashboard/response/response-user-insert-model';
import { UserInsertModel } from 'src/model/dashboard/request/user-insert-model';
import { UserContactModel } from 'src/model/dashboard/request/user-contact-model';
import { UserAddressModel } from 'src/model/dashboard/request/user-address-model';
import { ImageService } from 'src/app/services/image.service';
import * as moment from 'moment';
@Component({
  selector: 'warehouse-dashboard-user-add',
  templateUrl: './dashboard-user-add.component.html',
  styleUrls: ['./dashboard-user-add.component.scss'],
})
export class DashboardUserAddComponent implements OnInit {
  user: any;
  validateForm!: FormGroup;
  breadcrumbItems!: BreadcrumbItemsModel;
  isAuth: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  countryAndFlagData: any[] = [];
  countryStatesData: any[] = [];
  prefixPhoneData: any[] = [];
  showbuttonUpload: boolean = false;
  countrySelected: string = '';
  stateSelected: string = '';
  landlinePrefixSelected: string = '';
  countryDialCode: string = '';
  imgURL: any;
  selectedFile: any;
  dateFormat = 'dd/MM/YYYY';
  okText: string = '';
  descriptionAlert: string = '';
  isExpiredToken: boolean = false;

  rolesList = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
    { label: 'Moderator', value: 'moderator' },
  ];
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private dashboardService: DashboardService,
    private flagService: FlagService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initComponent();
    this.getCountriesAndPrefixPhoneWorld();
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
      emailPec: [null, [Validators.email]],
      role: [null, [Validators.required]],
      gender: [null, [Validators.required]],
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
      landlinePrefix: [null],
      landlineNumber: [
        '',
        [
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
      ],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: [
        '',
        [
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(3),
          Validators.maxLength(6),
        ],
      ],
      address: ['', [Validators.required]],
    });
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
          title: this.translate.instant('profile.add.title'),
        },
      ],
    };
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
        console.log('Unenable to retrieve data country and flag ' + error);
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

  successAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = message;
    this.descriptionAlert = this.translate.instant(
      'operation.confirmation.insert.user'
    );
    setTimeout(() => {
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
    });
  }

  errorAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_ERROR;
    this.messageAlert = message;
  }

  handleOnRemoneImage() {
    this.imgURL = '';
    this.showbuttonUpload = false;
  }

  handleOnChangeInput() {
    // If the alert incorrect password is opened,
    // when the user point the password/confirm password, the alert disappear.
    if (this.isAuth) {
      this.isAuth = !this.isAuth;
    }
  }

  handleOnChangeDate(date: any) {
    console.log('handleOnChangeDate: ', date);
  }

  handleOnCountrySelected() {
    if (!!this.countryAndFlagData?.length) {
      let country = this.countryAndFlagData?.find(
        (countryFlag: any) => countryFlag?.name === this.countrySelected
      );
      return country?.flag;
    }
  }

  handleOnFlagSelected(flag: any): string {
    let country = this.countryAndFlagData?.find(
      (country: any) => country?.name === flag?.nzValue
    );
    return country?.flag;
  }

  handleOnKeyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getPhonePrefixNumber(): string {
    return this.countryDialCode?.includes('+')
      ? this.countryDialCode
      : '+' + this.countryDialCode;
  }

  handleOnSelectCountry(selectedCountry: string) {
    this.countrySelected = selectedCountry;
    if (!!this.countryAndFlagData?.length) {
      let country = this.countryAndFlagData?.find(
        (countryFlag: any) => countryFlag?.name === this.countrySelected
      );
      this.countryDialCode = country?.dialCode;
    }
    if (!!this.countrySelected?.length) {
      this.handleOnGetStatesByCountry();
    }
  }

  handleOnGetStatesByCountry() {
    this.stateSelected = '';
    this.flagService.getStatesByCountry(this.countrySelected).subscribe(
      (states) => {
        this.countryStatesData = states.data?.states;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.alertType = AlertType.ALERT_WARNING;
          this.okText = 'Go to login';
          this.messageAlert = `Session timeout expiration`;
          this.descriptionAlert = `Sorry, you session in Warehouse System is expired. Try relogin again and come back.`;
          this.isExpiredToken = true;
        } else {
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  handleOnSelectState(selectedState: string) {
    this.stateSelected = selectedState;
  }

  handleOnInsertUser() {
    this.isAuth = false;
    let userContact: UserContactModel = {
      landlinePrefix: this.landlinePrefixSelected,
      phoneNumber: this.validateForm.controls['phoneNumber']?.value,
      landlineNumber: this.validateForm.controls['landlineNumber']?.value,
      phonePrefix: this.getPhonePrefixNumber(),
    };

    let userAddress: UserAddressModel = {
      country: this.validateForm.controls['country']?.value,
      state: this.validateForm.controls['state']?.value,
      addressLine: this.validateForm.controls['address']?.value,
      zipCode: this.validateForm.controls['zipCode']?.value,
    };

    let userData: UserInsertModel = {
      fullname: this.validateForm.controls['fullName']?.value,
      username: this.validateForm.controls['username']?.value.toLowerCase(),
      email: this.validateForm.controls['email']?.value,
      emailPec: this.validateForm.controls['emailPec']?.value,
      dateOfBirth: moment(
        this.validateForm.controls['dateOfBirth']?.value
      ).format('L'),
      contact: userContact,
      address: userAddress,
      role: this.validateForm.controls['role']?.value,
      gender: this.validateForm.controls['gender']?.value,
    };

    console.log('userData: ', userData);

    this.dashboardService.adminInsertUser(userData).subscribe(
      (response: ResponseUserInsertModel) => {
        console.log('response: ', response);
        //this.handleOnUploadImageProfile(response?.object?.userId as string);
        this.successAlertType(response?.message);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.alertType = AlertType.ALERT_WARNING;
          this.okText = 'Go to login';
          this.messageAlert = `Session timeout expiration`;
          this.descriptionAlert = `Sorry, you session in Warehouse System is expired. Try relogin again and come back.`;
          this.isExpiredToken = true;
        } else {
          this.errorAlertType(error?.error.message || error?.message);
        }
      }
    );
  }

  handleOnUploadImageProfile(userId: string) {
    // Instantiate a FormData to store form fields and encode the file
    let uploadData = new FormData();
    // Add file content to prepare the request
    uploadData.append('file', this.selectedFile);

    this.imageService.uploadImageProfile(uploadData, userId).subscribe(
      (response: any) => {
        this.successAlertType(response?.message);
      },
      (error: HttpErrorResponse) => {
        console.log('Error Occured duringng uploading file: ', error);
        this.errorAlertType(error?.message || error?.error?.message);
      }
    );
  }

  handleOnSelectLandlinePrefix(landlinePrefix: string) {
    console.log('handleOnSelectLandlinePrefix: ', landlinePrefix);
  }

  handleOnBack() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
  }

  // Add + at first of the prefix
  handleOnFormatPrefix(prefix: string): string {
    return prefix?.startsWith('+') ? prefix : '+' + prefix;
  }
}
