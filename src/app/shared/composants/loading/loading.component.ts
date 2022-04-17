import { Component, Input, OnInit } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types/size';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() typeLoad:any;
  @Input() messageType:any;
  @Input() descriptionMessage:any;

  size: NzSizeLDSType = 'default';


  constructor() { }

  ngOnInit(): void {
  }

}
