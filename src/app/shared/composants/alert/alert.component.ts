import { Component, Input, OnInit } from '@angular/core';
import { AlertType } from '../../enums/alert-type-enums';

@Component({
  selector: 'warehouse-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() typeAlert: any;
  @Input() messageAlert: string = '';
  @Input() descriptionAlert: string = '';

  constructor() {}

  ngOnInit(): void {
    this.CheckDefaultOrMessageAlert();
  }

  CheckDefaultOrMessageAlert() {
    if (this.messageAlert?.length === 0) {
      switch (this.typeAlert) {
        case AlertType.ALERT_INFO:
          this.messageAlert =
            AlertType.ALERT_INFO.charAt(0).toLocaleUpperCase() +
            AlertType.ALERT_INFO.slice(1);
          break;
        case AlertType.ALERT_ERROR:
          this.messageAlert =
            AlertType.ALERT_ERROR.charAt(0).toLocaleUpperCase() +
            AlertType.ALERT_ERROR.slice(1);
          break;
        case AlertType.ALERT_SUCCESS:
          this.messageAlert =
            AlertType.ALERT_SUCCESS.charAt(0).toLocaleUpperCase() +
            AlertType.ALERT_SUCCESS.slice(1);
          break;
        case AlertType.ALERT_WARNING:
          this.messageAlert =
            AlertType.ALERT_WARNING.charAt(0).toLocaleUpperCase() +
            AlertType.ALERT_WARNING.slice(1);
          break;
        default:
          this.messageAlert =
            AlertType.ALERT_INFO.charAt(0).toLocaleUpperCase() +
            AlertType.ALERT_INFO.slice(1);
          break;
      }
    }
  }
}
