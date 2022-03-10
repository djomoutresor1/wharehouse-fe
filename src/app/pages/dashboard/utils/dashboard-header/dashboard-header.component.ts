import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  @Output() handleOnNotifyNavigation: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() handleOnNotifyCollapsed: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  handleOnNavigate(url: string) {
    this.handleOnNotifyNavigation.emit(url);
  }

  handleOnCollapsed(collapsed: boolean) {
    this.handleOnNotifyCollapsed.emit(collapsed);
  }
}
