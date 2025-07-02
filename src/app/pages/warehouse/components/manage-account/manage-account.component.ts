import { Component, Injector, OnInit } from '@angular/core';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { PathParams } from 'src/app/shared/enums/path-params-enums';
import { BreadcrumbItemsModel } from 'src/model/utils/breadcrumb-items-model';
import { RecoveryEmailComponent } from '../recovery-email/recovery-email.component';
import { ChangePasswordComponent } from '../../auth/password/change-password/change-password.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'warehouse-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss'],
  imports: [SharedModule,RecoveryEmailComponent,ChangePasswordComponent],
  standalone: true
})
export class ManageAccountComponent extends WarehouseBaseComponent implements OnInit {

  breadcrumbItems!: BreadcrumbItemsModel;

  tabs = [
    {
      name: 'changePassword.title',
      disabled: false,
      icon: "lock"
    },
    {
      name: 'managePassword.recovery.title',
      disabled: false,
      icon: "mail"
    },
    {
      name: 'Tab 3',
      disabled: true,
      icon: ""
    }
  ];

  activeTab: number = 2;
  
  constructor(injector: Injector) {
    super(injector); 
  }

  override ngOnInit(): void {
    this.initComponent();
    console.log("ManagePasswordComponent: ", this.route);
   this.activeTab = Number(this.route.snapshot.queryParamMap.get(
      PathParams.TAB_NUMBER
    ));
    console.log("this.activeTab: ", this.activeTab);
  }

  initComponent() {
    this.breadcrumbItems = {
      parent: {
        title: this.translate.instant('profile.title'),
        url: 'dashboard/my-profile',
      },
      children: [
        {
          title: this.translate.instant('managePassword.title'),
        },
      ],
    };
  }

  handleOnSelectTab(tab: NzTabChangeEvent) {
    console.log("handleOnSelectTab: ", tab.index);
    this.activeTab = tab.index as number;
  }
}
