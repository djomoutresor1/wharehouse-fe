import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProfilService } from 'src/app/services/profil.service';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';

interface ItemData {
  id: 45;
}

@Component({
  selector: 'warehouse-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent implements OnInit {
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      },
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) =>
          this.updateCheckedSet(data.id, index % 2 !== 0)
        );
        this.refreshCheckedStatus();
      },
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) =>
          this.updateCheckedSet(data.id, index % 2 === 0)
        );
        this.refreshCheckedStatus();
      },
    },
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();
  allUsers: any;
  user:any;

  constructor(private router: Router, 
    private profilService: ProfilService,
    private nzModalService: NzModalService,
    private translate: TranslateService) {}

  ngOnInit(): void {
    this.profilService.retrieveUser().subscribe((data: any) => {
      this.allUsers = data;
      console.log('allUser: ', data);
    });
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

  rolesUser(data: any) {
    return data
      .map((currElement: any) => {
        return this.nameUser(currElement.name);
      })
      .join(',');
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checked;
  }

  handleOnNavigate(url: String) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }

  getRoleName(role: any) {
    switch (role?.name) {
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

  getUserColorRole(role: any) {
    switch (role?.name) {
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

  getRoleIcon(role: any) {
    switch (role?.name) {
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

  handleOnShow(user: ResponseLoginModel) {
    console.log("user - handleOnShow: ", user);
  }

  handleOnEdit(user: ResponseLoginModel) {
    console.log("user - handleOnEdit: ", user);
  }

  handleOnDelete(user: ResponseLoginModel) {
    console.log("user - handleOnDelete: ", user);
    this.nzModalService.confirm({
      nzTitle: '<h4>' + this.translate.instant('dashboard.modal.cancel.title') + '</h4>',
      nzContent: '<p>' + this.translate.instant('dashboard.modal.cancel.subtitle') + '</p>',
      nzCancelText: this.translate.instant('dashboard.cta.back'),
      nzOkText: this.translate.instant('dashboard.cta.logout'),
      nzOnOk: () => {
        this.profilService.onDeleteUser(user?.userId).subscribe((response:any)=>{
          console.log("onResponseDelete: ", response)
})
      },
    });

  }
}
