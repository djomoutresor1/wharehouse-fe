import { Component, OnInit, Injector, Input } from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { HeaderQuickLinksModel } from 'src/model/utils/header-quick-links-model';

@Component({
  selector: 'warehouse-header-links',
  templateUrl: './header-links.component.html',
  styleUrls: ['./header-links.component.scss'],
})
export class HeaderLinksComponent
  extends WarehouseBaseComponent
  implements OnInit
{
  @Input() showLinks: boolean = false;

  links: HeaderQuickLinksModel[] = [];

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    this.initComponent();
  }

  initComponent() {
    this.links = [
      {
        icon: '/assets/svg/Main_Component.svg',
        title: this.translate.instant('dashboard.title'),
        description: this.translate.instant(
          'message.quick.links.dashboard.description'
        ),
        url: '/warehouse/dashboard',
      },
      {
        icon: '/assets/svg/Building.svg',
        title: this.translate.instant('side.nav.left.organizations'),
        description: this.translate.instant(
          'message.quick.links.organization.description'
        ),
        url: '/warehouse/dashboard/organizations',
      },
      {
        icon: '/assets/svg/Users_Group.svg',
        title: this.translate.instant('side.nav.left.users'),
        description: this.translate.instant(
          'message.quick.links.user.description'
        ),
        url: '/warehouse/dashboard/users',
      },
      {
        icon: '/assets/svg/Chart_Bar_Horizontal.svg',
        title: this.translate.instant('side.nav.left.inventories'),
        description: this.translate.instant(
          'message.quick.links.inventory.description'
        ),
        url: '/warehouse/dashboard/inventories',
      },
    ];
  }
}
