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
  user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private warehouseLocalStorage: WarehouseLocalStorage
  ) {}

  ngOnInit(): void {
    this.user = Array.of(
      this.warehouseLocalStorage?.WarehouseGetTokenLocalStorage()
    );
    console.log(' userss; ', this.user);
  }

  nameUser(role: string) {
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

  choseTheme(role: string) {
    switch (role) {
      case 'User':
        return 'magenta';
        break;
      case 'Moderator':
        return 'orange';
        break;
      case 'Admin':
        return 'green';
        break;
      default:
        return 'magenta';
        break;
    }
  }

  rolesUser(data: any) {
    return data
      .map((currElement: any) => {
        return this.nameUser(currElement);
      })
      .join(' & ');
  }

  handleOnNavigate(url: String) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }
  
  handleOnChangePassword() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}/${Pages.CHANGE_PASSWORD}`]);
  }
}
