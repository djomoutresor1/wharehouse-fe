import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Pages } from 'src/app/shared/enums/pages-enums';

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

  constructor(private nzModalService: NzModalService, private router: Router) {}

  ngOnInit(): void {}

  handleOnNavigate(url: string) {
    this.handleOnNotifyNavigation.emit(url);
  }

  handleOnCollapsed(collapsed: boolean) {
    this.handleOnNotifyCollapsed.emit(collapsed);
  }

  handleOnLogout() {
    this.nzModalService.confirm({
      nzTitle: '<h4>Confirmation Logout</h4>',
      nzContent: '<p>Are you sure you want to logout?</p>',
      nzCancelText: 'Back',
      nzOkText: 'Logout',
      nzOnOk: () => {
        // TODO: implement the logic to logout
        this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
      },
    });
  }
}
