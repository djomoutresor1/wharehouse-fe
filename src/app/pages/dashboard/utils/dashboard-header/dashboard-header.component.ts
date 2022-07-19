import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthentificationService } from 'src/app/services/auth/authentification.service';
import { ProfilService } from 'src/app/services/profil.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { ResponseUserModel } from 'src/model/auth/response/response-user-model';

@Component({
  selector: 'warehouse-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  @Output() handleOnNotifyNavigation: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() handleOnNotifyCollapsed: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  checkRole: any;
  userLocalStorage: any;
  okText: string = '';
  alertType: string = '';
  messageAlert: string = '';
  descriptionAlert: string = '';
  isExpiredToken: boolean = false;
  imgURL: any;
  dataUser!: ResponseUserModel;
  isAuth: boolean = false;

  constructor(
    private nzModalService: NzModalService,
    private router: Router,
    private authentificationService: AuthentificationService,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private translate: TranslateService,
    private profilService: ProfilService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.userLocalStorage =
      this.warehouseLocalStorage?.WarehouseGetTokenLocalStorage();
    this.getInfosUser();
  }

  getInfosUser() {
    this.profilService.getUserInfos(this.userLocalStorage?.userId).subscribe(
      (response: ResponseUserModel) => {
        if (response?.profileImage) {
          let objectURL =
            'data:image/jpeg;base64,' +
            response?.profileImage?.find(
              (profile) => profile.imageType === Utils.WAREHOUSE_AVATAR_IMAGE
            )?.data;
          this.imgURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
        this.dataUser = response;
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
          console.log('Error Occured during downloading: ', error);
          this.errorAlertType(error?.error.message);
        }
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
    this.descriptionAlert = this.translate.instant('message.bye.description');
    setTimeout(() => {
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
    }, 200);
  }

  // da implementare avec un alert ng-zorro
  handleOnNavigate(url: string) {
    this.handleOnNotifyNavigation.emit(url);
  }

  handleOnCollapsed(collapsed: boolean) {
    this.handleOnNotifyCollapsed.emit(collapsed);
  }

  handleOnLogout() {
    this.userLocalStorage =
      this.warehouseLocalStorage?.WarehouseGetTokenLocalStorage();

    this.nzModalService.confirm({
      nzTitle:
        '<h4>' +
        this.translate.instant('dashboard.modal.logout.title') +
        '</h4>',
      nzContent:
        '<p>' +
        this.translate.instant('dashboard.modal.logout.subtitle') +
        '</p>',
      nzCancelText: this.translate.instant('dashboard.cta.back'),
      nzOkText: this.translate.instant('dashboard.cta.logout'),
      nzOnOk: () => {
        // TODO: implement the logic to logout
        this.authentificationService
          .userLogout(JSON.stringify(this.userLocalStorage?.userId))
          .subscribe(
            (response: any) => {
              console.log('response: ', response);
              this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
              this.successAlertType(
                this.translate.instant('message.bye.title')
              );
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
                console.log('error: ', error);
                this.errorAlertType(error?.error.message);
              }
            }
          );
      },
    });
  }

  getCapitalizeUsername(username: string): string {
    return username?.charAt(0).toUpperCase() + username?.slice(1);
  }

  handleOnOkModal(event: string) {
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    window.location.reload();
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }
}
