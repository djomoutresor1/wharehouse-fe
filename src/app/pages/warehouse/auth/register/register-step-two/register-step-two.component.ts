import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';

@Component({
  selector: 'warehouse-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: ['./register-step-two.component.scss','../register.component.scss']
})
export class RegisterStepTwoComponent implements OnInit {

  steps: string[] = [
    'User Informations',
    'Verification Email',
    'Registration User',
  ];
  currentStep: number = 1;
  size: NzButtonSize = 'large';

  constructor(
    private router: Router,
    private warehouseLocalStorage: WarehouseLocalStorage,
  ) {
  }

  ngOnInit(): void {
  }

  onGoToStepThree(){
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.REGISTERSTEP3}`]);
  }

  onRetrieveUser(){
    return this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
  }

}


