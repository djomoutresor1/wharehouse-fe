import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'warehouse-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input() typeNotification: any;
  @Input() messageNotification: string = '';
  @Input() descriptionNotification: string = '';

  constructor(private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.notification.create(
      this.typeNotification,
      this.messageNotification,
      this.descriptionNotification
    );
  }
}
