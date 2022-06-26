import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FlagService } from 'src/app/services/flag.service';
import { ProfilService } from 'src/app/services/profil.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { BreadcrumbItemsModel } from 'src/model/utils/breadcrumb-items-model';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { ResponseUserModel } from 'src/model/auth/response/response-user-model';
import { UserContactModel } from 'src/model/dashboard/request/user-contact-model';
import { UserAddressModel } from 'src/model/dashboard/request/user-address-model';
import { UserInsertModel } from 'src/model/dashboard/request/user-insert-model';
import * as moment from 'moment';
import { ResponseModel } from 'src/model/auth/response/response-model';
import { ImageService } from 'src/app/services/image.service';
@Component({
  selector: 'warehouse-dashboard-user-edit',
  templateUrl: './dashboard-user-edit.component.html',
  styleUrls: [
    './dashboard-user-edit.component.scss',
    '../dashboard-user-add/dashboard-user-add.component.scss',
  ],
})
export class DashboardUserEditComponent implements OnInit {
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
  keypressInput: boolean = false;
  dataUser!: ResponseUserModel;
  userLocalStorage: any;

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
    private profilService: ProfilService,
    private flagService: FlagService,
    private sanitizer: DomSanitizer,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initComponent();
    this.getCountriesAndPrefixPhoneWorld();
    this.userLocalStorage =
      this.warehouseLocalStorage?.WarehouseGetTokenLocalStorage();
    this.getInfosUser();
  }

  initForm() {
    // impossible to use default value with validateForm because data are not loading
    // yet at the init with dataUser
    // right thing loading default empty value, and set defauls value
    this.validateForm = this.fb.group({
      fullName: [
        '',
        [Validators.required, Validators.min(5), Validators.max(25)],
      ],
      username: [
        '',
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
        console.log('enable to retrieve data country and flag ' + error);
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
          console.log('Error Occured during downloading: ', error);
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  handleOnSelectState(selectedState: string) {
    console.log('handleOnSelectState: ', selectedState);
    this.stateSelected = selectedState;
  }

  successNotificationType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = message;
    // setTimeout(() => {
    //   this.handleOnBack();
    // }, 500);
  }

  handleOnUpdateUser() {
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

    let userUpdateData: UserInsertModel = {
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

    console.log('userUpdateData: ', userUpdateData);

    // let userUpdateData = {
    //   fullname: this.validateForm.controls['fullName']?.value,
    //   username: this.validateForm.controls['username']?.value.toLowerCase(),
    //   email: this.validateForm.controls['email']?.value,
    //   emailPec: this.validateForm.controls['emailPec']?.value,
    //   dateOfBirth: this.validateForm.controls['dateOfBirth']?.value,
    //   country: this.validateForm.controls['country']?.value,
    //   state: this.validateForm.controls['state']?.value,
    //   address: this.validateForm.controls['address']?.value,
    //   zipCode: this.validateForm.controls['zipCode']?.value,
    //   landlinePrefix: this.getPhonePrefixNumber(),
    //   phoneNumber: this.validateForm.controls['phoneNumber']?.value,
    //   landlineNumber: this.validateForm.controls['landlineNumber']?.value,
    //   role: this.validateForm.controls['role']?.value,
    //   gender: this.validateForm.controls['gender']?.value,
    // };

  if (!!this.imgURL?.length) {
      this.handleOnUploadImageProfile(this.dataUser?.userId);
    }

    // this.profilService
    //   .onUpdateUser(userUpdateData, this.dataUser?.userId)
    //   .subscribe(
    //     (response: ResponseModel) => {
    //       this.successNotificationType(response?.message);
    //       console.log('updateResponse: ', response);
    //     },
    //     (error: HttpErrorResponse) => {
    //       if (error.status === 403) {
    //         // Expiration token
    //         this.alertType = AlertType.ALERT_WARNING;
    //         this.okText = 'Go to login';
    //         this.messageAlert = `Session timeout expiration`;
    //         this.descriptionAlert = `Sorry, you session in Warehouse System is expired. Try relogin again and come back.`;
    //         this.isExpiredToken = true;
    //       } else {
    //         console.log('Error Occured during downloading: ', error);
    //         this.errorAlertType(error?.error.message);
    //       }
    //     }
    //   );
  }

  handleOnUploadImageProfile(userId: string) {
    // Instantiate a FormData to store form fields and encode the file
    let uploadData = new FormData();
    // Add file content to prepare the request
    uploadData.append('file', this.selectedFile);

    this.imageService.uploadImageProfile(uploadData, userId).subscribe(
      (response: ResponseModel) => {
        //this.successNotificationType(response?.message);
      },
      (error: HttpErrorResponse) => {
        console.log('Error Occured duringng saving: ', error);
        this.errorAlertType(error?.message || error?.error?.message);
      }
    );
  }

  handleOnSelectLandlinePrefix(landlinePrefix: string) {
    console.log('handleOnSelectLandlinePrefix: ', landlinePrefix);
  }

  handleOnBack() {
    this.router.navigate([
      `${Pages.WAREHOUSE}/${Pages.DASHBOARD}/${Pages.PROFILE}`,
    ]);
  }

  getInfosUser() {
    this.profilService.getUserInfos(this.userLocalStorage?.userId).subscribe(
      (response: ResponseUserModel) => {
        this.showbuttonUpload = response?.profileImage !== null ? true : false;
        if (response?.profileImage) {
          let objectURL =
            'data:image/jpeg;base64,' + response?.profileImage?.data;
          this.imgURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
        this.dataUser = response;
        this.setDefaultsInfosUserData();
        this.checkIfUserHasAdminRole();
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
          console.log('Error Occured during downloading: ', error);
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  setDefaultsInfosUserData() {
    // to set default value retrieved from BE
    this.countrySelected = this.dataUser?.address?.country;
    this.validateForm.patchValue({
      fullName: this.dataUser?.fullname,
      username: this.dataUser?.username,
      email: this.dataUser?.email,
      emailPec: this.dataUser?.emailPec,
      role: this.getDefaultRolesUser(this.dataUser?.roles),
      gender: this.dataUser?.gender,
      dateOfBirth: this.dataUser?.dateOfBirth,
      phoneNumber: this.dataUser?.contact?.phoneNumber,
      phonePrefix: this.dataUser?.contact?.phonePrefix,
      landlinePrefix: this.dataUser?.contact?.landlinePrefix,
      landlineNumber: this.dataUser?.contact?.landlineNumber,
      country: this.dataUser?.address?.country,
      state: this.dataUser?.address?.state,
      zipCode: this.dataUser?.address?.zipCode,
      address: this.dataUser?.address?.addressLine,
    });
  }

  checkIfUserHasAdminRole() {
    let userAdminRole = this.dataUser?.roles?.find(
      (role: any) => role?.name === Utils.ROLE_ADMIN
    );
    return userAdminRole !== undefined ? false : true;
  }

  userRoleName(role: string) {
    switch (role) {
      case Utils.ROLE_ADMIN:
        return Utils.ADMINS;
        break;
      case Utils.ROLE_MODERATOR:
        return Utils.MODERATOR;
        break;
      case Utils.ROLE_USER:
        return Utils.USER;
        break;
      default:
        return Utils.USER;
        break;
    }
  }

  getDefaultRolesUser(roles: any[]) {
    return roles?.map((role: any) => {
      return this.userRoleName(role?.name).toLowerCase();
    });
  }

  getUserColorRole(role: string) {
    switch (role) {
      case Utils.ROLE_USER:
        return '#0096c8';
        break;
      case Utils.ROLE_MODERATOR:
        return '#ffc107';
        break;
      case Utils.ROLE_ADMIN:
        return '#2a7a39';
        break;
      default:
        return '#0096c8';
        break;
    }
  }

  getRoleIcon(role: string) {
    switch (role) {
      case Utils.ROLE_USER:
        return 'user';
        break;
      case Utils.ROLE_MODERATOR:
        return 'user-switch';
        break;
      case Utils.ROLE_ADMIN:
        return 'team';
        break;
      default:
        return 'user';
        break;
    }
  }

  getRoleName(role: string) {
    switch (role) {
      case Utils.ROLE_ADMIN:
        return Utils.ADMINS;
        break;
      case Utils.ROLE_MODERATOR:
        return Utils.MODERATOR;
        break;
      case Utils.ROLE_USER:
        return Utils.USER;
        break;
      default:
        return Utils.USER;
        break;
    }
  }

  // Add + at first of the prefix
  handleOnFormatPrefix(prefix: string): string {
    return prefix?.startsWith('+') ? prefix : '+' + prefix;
  }
}
