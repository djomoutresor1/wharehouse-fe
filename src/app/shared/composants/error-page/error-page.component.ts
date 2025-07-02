import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AntDesignComponentsModule } from 'src/app/modules/ant-design-components.module';


@Component({
  selector: 'warehouse-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
  imports: [AntDesignComponentsModule],
  standalone: true
})
export class ErrorPageComponent implements OnInit {

  size: NzButtonSize = 'large';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  handleOnBack() {
    this.router.navigate([`/`]);
  }
}
