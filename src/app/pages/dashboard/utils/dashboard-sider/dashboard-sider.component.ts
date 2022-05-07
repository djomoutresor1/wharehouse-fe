import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'warehouse-dashboard-sider',
  templateUrl: './dashboard-sider.component.html',
  styleUrls: ['./dashboard-sider.component.scss'],
})
export class DashboardSiderComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  @Output() handleOnNotifyNavigation: EventEmitter<string> =
    new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  handleOnNavigate(url: string) {
    this.handleOnNotifyNavigation.emit(url);
  }
}
