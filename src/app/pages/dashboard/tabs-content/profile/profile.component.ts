import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';

@Component({
  selector: 'warehouse-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userLocalStorage: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private warehouseLocalStorage: WarehouseLocalStorage
  ) {}

  ngOnInit(): void {
    this.userLocalStorage =
      this.warehouseLocalStorage?.WarehouseGetTokenLocalStorage();
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

  // rolesUser(data: any) {
  //   return data
  //     .map((currElement: any) => {
  //       return this.nameUser(currElement);
  //     })
  //     .join(' & ');
  // }

  handleOnNavigate(url: String) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }

  handleOnBack() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
  }

  handleOnChangePassword() {
    this.router.navigate([
      `${Pages.WAREHOUSE}/${Pages.DASHBOARD}/${Pages.CHANGE_PASSWORD}`,
    ]);
  }
}
