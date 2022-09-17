import { Component, Injector, OnInit } from '@angular/core';
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

@Component({
  selector: 'warehouse-warehouse-base',
  templateUrl: './warehouse-base.component.html',
  styleUrls: ['./warehouse-base.component.scss'],
})
export class WarehouseBaseComponent implements OnInit {
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
  viewProfilService:ViewProfilService

  validateForm!: FormGroup;
  user!: ResponseResetModel;

  currentStep: number = 0;
  isAuth: boolean = false;
  isExpiredToken: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  descriptionAlert: string = '';
  okText: string = '';
  dateFormatOne = 'dd/MM/YYYY';
  dateFormatTwo = 'YYYY/MM/DD';
  WAREHOUSE_AFTER_7_DAYS = 7 * 24 * 60 * 60 * 1000;
  WAREHOUSE_MAX_SIZE_FILE = 5000000;

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
  
  constructor(injector: Injector) {
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
  }

  ngOnInit(): void {}

  checkIfUserIsAlreadyLogged() {
    let user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    if (user?.token || user?.user) {
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
    }
  }

  getUserStatus(status: string): string {
    switch (status) {
      case StatusType.STATUS_ACTIVE:
        return AlertType.ALERT_SUCCESS;
      case StatusType.STATUS_DISABLED:
        return AlertType.ALERT_ERROR;
      case StatusType.STATUS_PENDING:
        return AlertType.ALERT_WARNING;
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

  getUserColorRole(role: any) {
    switch (role?.name || role) {
      case Utils.ROLE_USER:
        return '#0096c8';
      case Utils.ROLE_MODERATOR:
        return '#ffc107';
      case Utils.ROLE_ADMIN:
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
    this.router.navigate([url]);
  }

  handleOnLogin() {
    let url = `${Pages.WAREHOUSE}/${Pages.LOGIN}`;
    this.handleOnNavigateByUrl(url);
  }

  handleOnRegister() {
    let url = `${Pages.WAREHOUSE}/${Pages.REGISTER}`
    this.handleOnNavigateByUrl(url);
  }

  handleOnForgotPassword() {
    let url = `${Pages.WAREHOUSE}/${Pages.FORGOT_PASSWORD}`;
    this.handleOnNavigateByUrl(url);
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
}
