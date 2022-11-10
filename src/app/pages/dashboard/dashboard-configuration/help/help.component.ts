import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { ResponseModel } from 'src/model/auth/response/response-model';
import { ResponseHelpModel } from 'src/model/configuration/response/response-help-model';
import { BreadcrumbItemsModel } from 'src/model/utils/breadcrumb-items-model';

@Component({
  selector: 'warehouse-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent extends WarehouseBaseComponent implements OnInit {
  breadcrumbItems!: BreadcrumbItemsModel;
  helps!: ResponseHelpModel[];
  helpDatatable!: ResponseHelpModel;
  helpStatusSelected: string = '';

  drawerCreateVisible: boolean = false;
  drawerStatusVisible: boolean = false;
  drawerShowVisible: boolean = false;
  titleDrawerCreate!: string;
  titleDrawerChange!: string;
  titleDrawerShow!: string;

  modeAction!: string;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    this.initForm();
    this.initComponent();
    this.handleOnGetHelps();
  }

  initForm() {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required, Validators.min(5), Validators.max(25)]],
      description: [
        '',
        [Validators.required, Validators.min(5), Validators.max(15)],
      ],
      content: [
        '',
        [Validators.required, Validators.min(5), Validators.max(15)],
      ],
    });
  }

  initComponent() {
    this.user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    let currentLang = null;
    currentLang = this.translate.currentLang;
    if (currentLang === undefined) {
      currentLang =
        this.warehouseLocalStorage.WarehouseGetLanguageLocalStorage();
    }
    this.translate.use(currentLang as string);
    this.breadcrumbItems = {
      parent: {
        title: this.translate.instant('side.nav.left.help.title'),
      },
    };
  }

  handleOnGetHelps() {
    this.configurationService.getAllHelps().subscribe(
      (response: ResponseHelpModel[]) => {
        this.helps = response;
      },
      (error: HttpErrorResponse) => {
        console.log('error: ', error);
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  handleOnOkModal(event: string) {
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    window.location.reload();
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }

  handleOnAddHelp() {
    this.drawerCreateVisible = true;
    this.modeAction = Utils.WAREHOUSE_ACTION_CREATE;
  }

  handleOnCloseDrawer(action: string) {
    if (action === Utils.WAREHOUSE_ACTION_CREATE) {
      this.drawerCreateVisible = false;
    } else if (action === Utils.WAREHOUSE_ACTION_SHOW) {
      this.drawerShowVisible = false;
    } else {
      this.drawerStatusVisible = false;
    }
    this.modeAction = '';
    this.helpStatusSelected = '';
  }

  handleOnCreateHelp() {
    this.isAuth = false;
    let help = {
      title: this.validateForm.controls['title'].value,
      description: this.validateForm.controls['description'].value,
      content: this.validateForm.controls['content'].value,
      userId: this.user.userId,
    };
    this.configurationService.onCreateHelp(help).subscribe(
      (response: ResponseModel) => {
        this.successAlertType(response?.message);
        this.validateForm.reset();
        this.handleOnCloseDrawer(Utils.WAREHOUSE_ACTION_CREATE);
        this.handleOnGetHelps();
      },
      (error: HttpErrorResponse) => {
        console.log('error: ', error);
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  handleOnUpdateHelp() {
    this.isAuth = false;
    let help = {
      title: this.validateForm.controls['title'].value,
      description: this.validateForm.controls['description'].value,
      content: this.validateForm.controls['content'].value,
      userId: this.user.userId,
      status: this.helpDatatable.status,
    };
    this.configurationService.onUpdateHelp(help).subscribe(
      (response: ResponseModel) => {
        this.successAlertType(response?.message);
        this.validateForm.reset();
        this.handleOnCloseDrawer(Utils.WAREHOUSE_ACTION_CREATE);
        this.handleOnGetHelps();
      },
      (error: HttpErrorResponse) => {
        console.log('error: ', error);
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  handleOnChangeStatus() {
    this.isAuth = false;
    this.configurationService
      .onChangeStatusHelp(
        this.user.userId,
        this.helpDatatable.title,
        this.helpStatusSelected
      )
      .subscribe(
        (response: ResponseModel) => {
          this.successAlertType(response?.message);
          this.handleOnCloseDrawer(Utils.WAREHOUSE_ACTION_STATUS);
          this.handleOnGetHelps();
        },
        (error: HttpErrorResponse) => {
          console.log('error: ', error);
          if (error.status === 403) {
            // Expiration token
            this.expirationToken();
          } else {
            this.errorAlertType(error?.error.message);
          }
        }
      );
  }

  handleOnStatus(help: ResponseHelpModel) {
    this.drawerStatusVisible = true;
    this.titleDrawerChange = this.translate.instant(
      'operation.confirmation.change.status'
    );
    this.helpDatatable = help;
  }

  handleOnShow(help: ResponseHelpModel) {
    this.drawerShowVisible = true;
    this.titleDrawerShow = this.translate.instant('side.nav.left.help.show');
    this.helpDatatable = help;
  }

  handleOnEdit(help: ResponseHelpModel) {
    this.modeAction = Utils.WAREHOUSE_ACTION_UPDATE;
    this.drawerCreateVisible = true;
    this.validateForm.patchValue({
      title: help?.title,
      description: help?.description,
      content: help?.content,
    });
    this.helpDatatable = help;
  }

  handleOnDelete(title: string) {
    this.isAuth = false;
    this.nzModalService.confirm({
      nzTitle:
        '<h4>' +
        this.translate.instant('dashboard.modal.deleteUser.title') +
        '</h4>',
      nzContent:
        '<p>' +
        this.translate.instant('dashboard.modal.delete.subtitle') +
        '</p>',
      nzCancelText: this.translate.instant('dashboard.cta.no'),
      nzOkText: this.translate.instant('dashboard.cta.yes'),
      nzOnOk: () => {
        this.configurationService.onDeleteHelp(title).subscribe(
          (response: ResponseModel) => {
            this.successAlertType(response?.message);
            this.handleOnGetHelps();
          },
          (error: HttpErrorResponse) => {
            if (error.status === 403) {
              // Expiration token
              this.expirationToken();
            } else {
              console.log('Error Occured during downloading: ', error);
              this.errorAlertType(error?.error.message || error?.message);
            }
          }
        );
      },
    });
  }

  handleOnShowMore(title: string, description: string) {
    this.nzModalService.info({
      nzTitle: this.firstLetterUpperCase(title),
      nzContent: description,
      nzOnOk: () => {},
    });
  }
}
