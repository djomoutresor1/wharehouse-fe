import { Component, Injector, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthentificationService } from 'src/app/services/auth/authentification.service';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FlagService } from 'src/app/services/flag.service';
import { ImageService } from 'src/app/services/image.service';
import { ProfilService } from 'src/app/services/profil.service';
import { TableService } from 'src/app/services/table.service';
import { ViewProfilService } from 'src/app/services/view-profil.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { StatusType } from 'src/app/shared/enums/status-type-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { ResponseResetModel } from 'src/model/auth/response/response-reset-model';
import { differenceInCalendarDays } from 'date-fns';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as moment from 'moment';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { Internationalizations } from 'src/app/shared/enums/internationalizations-enums';
import { Languages } from 'src/app/shared/enums/languages-enums';
import { LanguageModel } from 'src/model/utils/language-model';
import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';
import { HttpRequest } from '@angular/common/http';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'warehouse-warehouse-base',
  templateUrl: './warehouse-base.component.html',
  styleUrls: ['./warehouse-base.component.scss'],
})
export class WarehouseBaseComponent implements OnInit {
  store: Store<any>;
  router: Router;
  route: ActivatedRoute;
  fb: FormBuilder;
  translate: TranslateService;
  dashboardService: DashboardService;
  authentificationService: AuthentificationService;
  warehouseLocalStorage: WarehouseLocalStorage;
  authorizationService: AuthorizationService;
  profilService: ProfilService;
  flagService: FlagService;
  imageService: ImageService;
  sanitizer: DomSanitizer;
  nzModalService: NzModalService;
  categoriesService: CategoriesService;
  tableService: TableService;
  viewProfilService: ViewProfilService;
  configurationService: ConfigurationService;
  organizationService: OrganizationService;

  validateForm!: FormGroup;
  user!: ResponseResetModel;
  warehouseUserData!: Observable<ResponseLoginModel>;
  request!: HttpRequest<any>;

  currentStep: number = 0;
  isAuth: boolean = false;
  isLoading: boolean = false;
  loadingPercent: number = 25;
  redirectUrlAfterLoading: string = '';
  isExpiredToken: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  descriptionAlert: string = '';
  okText: string = '';
  dateFormatOne = 'dd/MM/YYYY';
  dateFormatTwo = 'YYYY/MM/DD';
  dateFormatThree = 'DD/MM/YYYY HH:mm:ss';
  WAREHOUSE_AFTER_7_DAYS = 7 * 24 * 60 * 60 * 1000;
  WAREHOUSE_MAX_SIZE_FILE = 5000000;
  WAREHOUSE_18_YEARS_OLD = 18;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '300px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    //upload: (file: File) => { ... },
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

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

  languages: LanguageModel[] = [
    {
      img: '../../../../../assets/countrie-flags/en.png',
      code: Internationalizations.ENGLISH,
      name: Languages.ENGLISH,
    },
    {
      img: '../../../../../assets/countrie-flags/it.png',
      code: Internationalizations.ITALIAN,
      name: Languages.ITALIAN,
    },
    {
      img: '../../../../../assets/countrie-flags/fr.png',
      code: Internationalizations.FRENCH,
      name: Languages.FRENCH,
    },
    {
      img: '../../../../../assets/countrie-flags/es.png',
      code: Internationalizations.SPAIN,
      name: Languages.SPAIN,
    },
  ];

  constructor(injector: Injector) {
    this.store = injector.get(Store);
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
    this.fb = injector.get(FormBuilder);
    this.dashboardService = injector.get(DashboardService);
    this.authentificationService = injector.get(AuthentificationService);
    this.profilService = injector.get(ProfilService);
    this.warehouseLocalStorage = injector.get(WarehouseLocalStorage);
    this.authorizationService = injector.get(AuthorizationService);
    this.translate = injector.get(TranslateService);
    this.flagService = injector.get(FlagService);
    this.imageService = injector.get(ImageService);
    this.sanitizer = injector.get(DomSanitizer);
    this.nzModalService = injector.get(NzModalService);
    this.categoriesService = injector.get(CategoriesService);
    this.tableService = injector.get(TableService);
    this.viewProfilService = injector.get(ViewProfilService);
    this.configurationService = injector.get(ConfigurationService);
    this.organizationService = injector.get(OrganizationService);
  }

  ngOnInit(): void {}

  checkIfUserIsAlreadyLogged() {
    let user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    if (user?.token || user?.user) {
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
    }
  }

  formatObjectDate(date: string, format: string): string {
    if (!!date.length) {
      return moment(date).format(format);
    }
    return '-';
  }

  formatObjectStatus(status: string): string {
    switch (status.toLowerCase()) {
      case StatusType.STATUS_ACTIVE:
        return this.translate.instant('dataTable.status.active');
      case StatusType.STATUS_DISABLED:
        return this.translate.instant('dataTable.status.disabled');
      case StatusType.STATUS_PENDING:
        return this.translate.instant('dataTable.status.pending');
      case StatusType.STATUS_NEVER_CONNECTED:
        return this.translate.instant('dataTable.status.never.connected');
      case StatusType.STATUS_DELETED:
        return this.translate.instant('dataTable.status.deleted');
      case StatusType.STATUS_PROCESSING:
        return this.translate.instant('dataTable.status.processing');
      default:
        return this.translate.instant('dataTable.status.pending');
    }
  }

  getObjectStatus(status: string): string {
    switch (status.toLowerCase()) {
      case StatusType.STATUS_ACTIVE:
        return AlertType.ALERT_SUCCESS;
      case StatusType.STATUS_DISABLED:
        return AlertType.ALERT_ERROR;
      case StatusType.STATUS_PENDING:
        return AlertType.ALERT_WARNING;
      case StatusType.STATUS_DELETED:
        return AlertType.ALERT_ERROR;
      case StatusType.STATUS_DISCONNECTED:
        return AlertType.ALERT_NEVER_CONNECT;
      case StatusType.STATUS_PROCESSING:
        return AlertType.ALERT_PROCESSING;
      default:
        return AlertType.ALERT_WARNING;
    }
  }

  getUserRoleName(role: any) {
    switch (role?.name || role) {
      case Utils.ROLE_ADMIN:
        return Utils.ADMINS;
      case Utils.ROLE_MODERATOR:
        return Utils.MODERATOR;
      case Utils.ROLE_USER:
        return Utils.USER;
      default:
        return Utils.USER;
    }
  }

  getObjectColor(role: any) {
    switch (role?.name || role) {
      case Utils.ROLE_USER:
      case Utils.PACKAGE_STANDARD:
        return '#0096c8';
      case Utils.ROLE_MODERATOR:
      case Utils.PACKAGE_BUSINESS:
        return '#ffc107';
      case Utils.ROLE_ADMIN:
      case Utils.PACKAGE_PREMIUM:
        return '#2a7a39';
      default:
        return '#0096c8';
    }
  }

  getUserRoleIcon(role: any) {
    switch (role?.name || role) {
      case Utils.ROLE_USER:
        return 'user';
      case Utils.ROLE_MODERATOR:
        return 'user-switch';
      case Utils.ROLE_ADMIN:
        return 'team';
      default:
        return 'user';
    }
  }

  getFlagLanguageByCode(flag: string): string {
    return this.languages.filter((language) => language.code === flag)[0]?.img;
  }

  expirationToken() {
    this.alertType = AlertType.ALERT_WARNING;
    this.okText = this.translate.instant('message.timeout.cta');
    this.messageAlert = this.translate.instant('message.timeout.title');
    this.descriptionAlert = this.translate.instant(
      'message.timeout.description'
    );
    this.isExpiredToken = true;
  }

  handleOnNavigateByUrl(url: string) {
    this.router.navigate([url], {
      relativeTo: this.route,
    });
  }

  handleOnLogin() {
    let url = `${Pages.WAREHOUSE}/${Pages.LOGIN}`;
    this.router.navigate([url]);
  }

  handleOnRegister() {
    let url = `${Pages.WAREHOUSE}/${Pages.REGISTER}`;
    this.router.navigate([url]);
  }

  handleOnForgotPassword() {
    let url = `${Pages.WAREHOUSE}/${Pages.FORGOT_PASSWORD}`;
    this.router.navigate([url]);
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
  }

  handleOnChangeInput() {
    // If the alert incorrect password is opened,
    // when the user point the password/confirm password, the alert disappear.
    if (this.isAuth) {
      this.isAuth = !this.isAuth;
    }
  }

  firstLetterUpperCase(content: string): string {
    return content.charAt(0).toUpperCase() + content.slice(1);
  }

  truncateLongText(content: string, truncateTo?: number) {
    if (truncateTo && truncateTo != 0) {
      return content.length > truncateTo
        ? content.slice(0, truncateTo) + ' ...'
        : content;
    }
    return content.slice(0, 25) + ' ...'; // default truncate content to 25 if the user not precised parameter truncateTo
  }

  handleOnDisabledDatePicker(current: Date): boolean {
    return differenceInCalendarDays(current, new Date()) > 0;
  }

  handleOnCheckAlmost18YearsOld(dateSelected: Date): boolean {
    var now = moment(new Date()); // todays date
    var end = moment(dateSelected); // another date
    var duration = moment.duration(now.diff(end));
    return duration.asYears() > this.WAREHOUSE_18_YEARS_OLD ? true : false;
  }

  handleOnModalAlmost18YearsOld() {
    this.nzModalService.warning({
      nzTitle: this.translate.instant('dashboard.modal.almost18YearsOld.title'),
      nzContent:
        '<div class="modal-wrapper container">' +
        '<div class="row modal-body">' +
        '<div class="col modal-body-year">' +
        '<span class="modal-year">' +
        this.WAREHOUSE_18_YEARS_OLD +
        '</span>' +
        '</div>' +
        '<div class="col modal-body-title">' +
        '<span class="modal-title">' +
        this.translate.instant('dashboard.modal.almost18YearsOld.subtitle') +
        '</span>' +
        '</div>' +
        '<div class="col modal-body-description">' +
        '<span class="modal-description">' +
        this.translate.instant('dashboard.modal.almost18YearsOld.description') +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>',
    });
  }

  handleOnPaste(event: any) {
    event.preventDefault();
    return false;
  }
}
