import { Component, Input, OnInit } from '@angular/core';
import { NzTSType } from 'ng-zorro-antd/core/types';
import { NzTextEditComponent } from 'ng-zorro-antd/typography';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() typeAlert: string = '';
  @Input() MessageTest: string = '';


  constructor() { }

  ngOnInit(): void {
  }

}


