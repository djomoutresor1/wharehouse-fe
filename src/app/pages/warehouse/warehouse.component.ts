import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pages } from 'src/app/shared/enums/pages-enums';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
})
export class WarehouseComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    document.title = "Warehouse home"
  }

  handleOnLogin() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }

  handleOnRegister() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.REGISTER}`]);
  }
}
