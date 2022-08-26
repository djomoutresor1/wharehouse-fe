import { Component, Injector, OnInit } from '@angular/core';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { PathParams } from 'src/app/shared/enums/path-params-enums';
import { BreadcrumbItemsModel } from 'src/model/utils/breadcrumb-items-model';

@Component({
  selector: 'warehouse-manage-password',
  templateUrl: './manage-password.component.html',
  styleUrls: ['./manage-password.component.scss']
})
export class ManagePasswordComponent extends WarehouseBaseComponent implements OnInit {

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
