import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';


@Component({
  selector: 'warehouse-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user:any;


  constructor( private warehouseLocalStorage: WarehouseLocalStorage) {}

  ngOnInit(): void {
    this.user = Array.of(this.warehouseLocalStorage?.WarehouseGetTokenLocalStorage());
    console.log(" userss; ",this.user)
  }

  rolesUser(role:String){
    switch (role) {
    case Utils.ROLE_ADMIN :
         return Utils.ADMINS
        break;
    case Utils.ROLE_MODERATOR: 
         return Utils.MODERATOR
        break;
    case Utils.ROLE_USER: 
         return Utils.USER
        break;
    default: 
         return Utils.USER
        break
    }
}

}