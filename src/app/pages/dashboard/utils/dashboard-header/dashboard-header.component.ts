import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthentificationService } from 'src/app/services/auth/authentification.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  @Output() handleOnNotifyNavigation: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() handleOnNotifyCollapsed: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(
    private nzModalService: NzModalService,
    private router: Router,
    private authentificationService: AuthentificationService,
    private warehouseLocalStorage: WarehouseLocalStorage
  ) {}

  ngOnInit(): void {}

  handleOnNavigate(url: string) {
    this.handleOnNotifyNavigation.emit(url);
  }

  handleOnCollapsed(collapsed: boolean) {
    this.handleOnNotifyCollapsed.emit(collapsed);
  }

  handleOnLogout() {
    //this.handleOnNotifyNavigation.emit('logout');
    // this.authentificationService.userLogout('KA37647').subscribe(
    //   (response: string) => {
    //     console.log('response: ', response);
    //     this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    //     this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
    //   },
    //   (error) => {
    //     console.log('error: ', error);
    //   }
    // );
    this.nzModalService.confirm({
      nzTitle: '<h4>Confirmation Logout</h4>',
      nzContent: '<p>Are you sure you want to logout?</p>',
      nzCancelText: 'Back',
      nzOkText: 'Logout',
      nzOnOk: () => {
        // TODO: implement the logic to logout
        this.authentificationService.userLogout('KA37647').subscribe(
          (response: any) => {
            console.log('response: ', response);
            this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
          },
          (error: HttpErrorResponse) => {
            console.log('error: ', error);
          }
        );
      },
    });
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }
}
