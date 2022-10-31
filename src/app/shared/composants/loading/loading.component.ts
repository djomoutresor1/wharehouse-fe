import { Component, Injector, Input, OnInit } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types/size';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'warehouse-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent extends WarehouseBaseComponent implements OnInit {
  @Input() email: string = '';
  @Input() loading: boolean = false;
  @Input() redirectUrl!: string;
  @Input() typeLoad: any;
  @Input() messageType: any;
  @Input() descriptionMessage: any;

  size: NzSizeLDSType = 'default';

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    setInterval(() => {
      this.loadingPercent = this.loadingPercent + 25;
      if (this.loadingPercent === 100) {
        this.router.navigate([this.redirectUrl]);
      }
    }, 1000);
  }
}
