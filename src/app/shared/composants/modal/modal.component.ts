import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertType } from '../../enums/alert-type-enums';
import { Utils } from '../../enums/utils-enums';

@Component({
  selector: 'warehouse-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() typeModal: any;
  @Input() messageModal: string = '';
  @Input() descriptionModal: string = '';
  @Input() okTextModal: string = '';
  @Input() cancelTextModal: string = '';
  @Input() showClosableModal: boolean = false;

  @Output() handleOnOkModal: EventEmitter<any> = new EventEmitter<any>();

  constructor(private nzModalService: NzModalService) {}

  ngOnInit(): void {
    if (this.typeModal === AlertType.ALERT_WARNING) {
      this.nzModalService.warning({
        nzTitle: this.messageModal,
        nzContent: this.descriptionModal,
        nzClosable: this.showClosableModal,
        nzOkText: this.okTextModal,
        nzCentered: false,
        nzOnOk: () => this.handleOnOkModal.emit(Utils.WAREHOUSE_TIMEOUT_TOKEN),
      });
    }
    if (this.typeModal === AlertType.ALERT_SUCCESS) {
      this.nzModalService.success({
        nzTitle: this.messageModal,
        nzContent: this.descriptionModal,
        nzClosable: this.showClosableModal,
        nzOkText: this.okTextModal,
        nzCentered: false,
        nzOnOk: () => this.handleOnOkModal.emit(Utils.WAREHOUSE_TIMEOUT_TOKEN),
      });
    }
    if (this.typeModal === AlertType.ALERT_INFO) {
      this.nzModalService.info({
        nzTitle: this.messageModal,
        nzContent: this.descriptionModal,
        nzClosable: this.showClosableModal,
        nzOkText: this.okTextModal,
        nzCentered: false,
        nzOnOk: () => this.handleOnOkModal.emit(Utils.WAREHOUSE_TIMEOUT_TOKEN),
      });
    }
    if (this.typeModal === AlertType.ALERT_ERROR) {
      this.nzModalService.error({
        nzTitle: this.messageModal,
        nzContent: this.descriptionModal,
        nzClosable: this.showClosableModal,
        nzOkText: this.okTextModal,
        nzCentered: false,
        nzOnOk: () => this.handleOnOkModal.emit(Utils.WAREHOUSE_TIMEOUT_TOKEN),
      });
    }
  }
}
