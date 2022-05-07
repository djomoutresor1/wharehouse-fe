import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthentificationService } from 'src/app/services/auth/authentification.service';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';

@Component({
  selector: 'warehouse-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  @Output() handleOnNotifyNavigation: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() handleOnNotifyCollapsed: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  checkRole: any;
  name = '';
  language: string = 'en';

  countries: any [] = [
    {countryCode:"826", code: "en",name: "English"},
    {countryCode:"380", code: "it",name: "Italy"},
    {countryCode:"250", code: "fr",name: "French"},];

    

  constructor(
    private nzModalService: NzModalService,
    private router: Router,
    private authentificationService: AuthentificationService,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private translate: TranslateService
    ) {
      translate.setDefaultLang('en');
      translate.use('en');
    }

  ngOnInit(): void {
    this.translateText();
  }

// da implementare avec un alert ng-zorro
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
        this.authentificationService.userLogout('KA37647').subscribe(
          (response: any) => {
            console.log('response: ', response);
            this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
          },
          (error: HttpErrorResponse) => {
            console.log('error: ', error);
          }
        );
      },
    });
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }

  
  translateText() {
    this.translate
      .get('angular')
      .subscribe((text: string) => (this.name = text));
  }

  change() {
    const language = this.language || 'en';
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    this.translateText();
  }
  
}
