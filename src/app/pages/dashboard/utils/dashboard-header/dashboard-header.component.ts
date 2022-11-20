import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { ResponseUserModel } from 'src/model/auth/response/response-user-model';

@Component({
  selector: 'warehouse-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent
  extends WarehouseBaseComponent
  implements OnInit
{
  @Input() isCollapsed: boolean = false;
  @Output() handleOnNotifyNavigation: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() handleOnNotifyCollapsed: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  checkRole: any;
  userLocalStorage: any;
  imgURL: any;
  dataUser!: ResponseUserModel;
  titleDrawerHelp: string = '';
  visibleDrawerHelp: boolean = false;
  visibleShowNotifications: boolean = false;
  visibleShowLinks: boolean = false;
  sizeDrawerHelp: number = 500;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    this.userLocalStorage =
      this.warehouseLocalStorage?.WarehouseGetTokenLocalStorage();
    this.getInfosUser();
  }

  getInfosUser() {
    this.profilService.getUserInfos(this.userLocalStorage?.userId).subscribe(
      (response: ResponseUserModel) => {
        if (!!response?.profileImage?.length) {
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
          this.expirationToken();
        } else {
          console.log('Error Occured during downloading: ', error);
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  successAlertTypeComponent(message: string): void {
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
              this.successAlertTypeComponent(
                this.translate.instant('message.bye.title')
              );
            },
            (error: HttpErrorResponse) => {
              if (error.status === 403) {
                // Expiration token
                this.expirationToken();
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

  handleOnNavigateWithParams(url: string) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}`], {
      queryParams: { tabNumber: 0 },
    });
  }

  handleOnDrawerHelp() {
    this.titleDrawerHelp = this.translate.instant('profile.help');
    this.visibleDrawerHelp = true;
  }

  handleOnCloseDrawerHelp() {
    this.visibleDrawerHelp = false;
  }

  handleOnShowNotifications() {
    this.visibleShowLinks = false;
    this.visibleShowNotifications = !this.visibleShowNotifications;
  }

  handleOnShowLinks() {
    this.visibleShowNotifications = false;
    this.visibleShowLinks = !this.visibleShowLinks;
  }

  handleOnNotifyNotifications(event: any) {
    // Send false from child component to alert closing parent component;
    this.visibleShowNotifications = event;
  }
}
