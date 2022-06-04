import { Component, Input, OnInit } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types/size';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'warehouse-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() typeLoad:any;
  @Input() messageType:any;
  @Input() descriptionMessage:any;

  size: NzSizeLDSType = 'default';


  constructor(public loadingService: LoadingService) { }

  ngOnInit(): void {
  }

}
