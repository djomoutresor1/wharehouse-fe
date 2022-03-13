import { Component, OnInit } from '@angular/core';
import { ProfilService } from 'src/app/services/profil.service';
import { Person } from './../../../../../interfaces/profils';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { Pages } from 'src/app/shared/enums/pages-enums';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profilData: any;
  myArray: Person[] = [];
  editCache: { [key: string]: { edit: boolean; data: Person } } = {};

  constructor(
    public profilService: ProfilService,
    private nzModalService: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profilData = this.profilService.getDataProfil();
    this.myArray.push(this.profilData);
    console.log('profilData: ', this.myArray);
    this.updateEditCache();
  }

  hashPassword(password: string) {
    return '*'.repeat(password.length);
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {

    // a revoir dans le cas ou il y'aura plusiers profils
    const index = this.myArray.findIndex((item) => item.id === id);
    this.editCache[id] = {
      data: { ...this.myArray[index] },
      edit: false,
    };

    localStorage.removeItem('formData');
    this.handleOnLogout();
  }

  handleOnLogout() {
    this.nzModalService.confirm({
      nzTitle: '<h4>Confirmation Cancel Profil</h4>',
      nzContent:
        '<p>cancelled you will turn back to login page...are you sure to cancel?</p>',
      nzCancelText: 'Back',
      nzOkText: 'Cancel definitively',
      nzOnOk: () => {
        // TODO: implement the logic to logout
        this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
      },
    });
  }

  saveEdit(id: string): void {
    const index = this.myArray.findIndex((item) => item.id === id);
    Object.assign(this.myArray[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.myArray.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }
}
