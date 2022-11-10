import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { Internationalizations } from 'src/app/shared/enums/internationalizations-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { ResponseModel } from 'src/model/auth/response/response-model';
import { GlossaryModel } from 'src/model/configuration/request/glossary-model';
import { ResponseGlossaryModel } from 'src/model/configuration/response/response-glossary-model';
import { BreadcrumbItemsModel } from 'src/model/utils/breadcrumb-items-model';

@Component({
  selector: 'warehouse-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss'],
})
export class GlossaryComponent
  extends WarehouseBaseComponent
  implements OnInit
{
  updateGlossaryForm!: FormGroup;
  breadcrumbItems!: BreadcrumbItemsModel;
  glossaries!: ResponseGlossaryModel[];
  updateGlossary!: GlossaryModel;
  glossaryCode: string = '';
  glossaryObject: string = '';
  glossaryFlag: string = '';
  glossaryLanguage: string = '';
  flagPath: string = '../../../../../assets/countrie-flags/';

  drawerCreateVisible: boolean = false;
  drawerUpdateVisible: boolean = false;
  drawerShowVisible: boolean = false;

  modeAction!: string;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    this.initForm();
    this.initComponent();
    this.handleOnGetGlossaries();
  }

  initForm() {
    this.validateForm = this.fb.group({
      code: ['', [Validators.required, Validators.min(2), Validators.max(3)]],
      object: [
        '',
        [Validators.required, Validators.min(5), Validators.max(15)],
      ],
      description_it: [
        '',
        [Validators.required, Validators.min(5), Validators.max(25)],
      ],
      description_es: [
        '',
        [Validators.required, Validators.min(5), Validators.max(25)],
      ],
      description_en: [
        '',
        [Validators.required, Validators.min(5), Validators.max(25)],
      ],
      description_fr: [
        '',
        [Validators.required, Validators.min(5), Validators.max(25)],
      ],
    });
    this.updateGlossaryForm = this.fb.group({
      code: ['', [Validators.required, Validators.min(2), Validators.max(3)]],
      object: [
        '',
        [Validators.required, Validators.min(5), Validators.max(15)],
      ],
      description: [
        '',
        [Validators.required, Validators.min(5), Validators.max(25)],
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
        title: this.translate.instant('side.nav.left.glossary.title'),
      },
    };
  }

  handleOnGetGlossaries() {
    this.configurationService.getAllGlossaries().subscribe(
      (response: ResponseGlossaryModel[]) => {
        this.glossaries = response;
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

  handleOnEdit(glossary: ResponseGlossaryModel) {
    console.log(glossary);
    this.glossaryFlag = '';
    this.glossaryLanguage = '';
    this.modeAction = Utils.WAREHOUSE_ACTION_UPDATE;
    this.drawerUpdateVisible = true;
    this.glossaryCode = glossary?.code;
    this.glossaryObject = glossary?.object;
    this.glossaryLanguage = glossary?.language;
    this.glossaryFlag =
      this.flagPath + glossary.language.split('-')[0] + '.png';

    this.updateGlossaryForm.patchValue({
      code: glossary?.code,
      object: glossary?.object,
      description: glossary.description,
    });
  }

  handleOnDelete(glossary: ResponseGlossaryModel) {
    this.isAuth = false;
    this.nzModalService.confirm({
      nzTitle:
        '<h4>' +
        this.translate.instant('dashboard.modal.deleteGlossary.title') +
        '</h4>',
      nzContent:
        '<p>' +
        this.translate.instant('dashboard.modal.deleteGlossary.subtitle', {
          code: glossary.code.toUpperCase(),
        }) +
        '</p>',
      nzCancelText: this.translate.instant('dashboard.cta.no'),
      nzOkText: this.translate.instant('dashboard.cta.yes'),
      nzOnOk: () => {
        this.configurationService.onDeleteGlossary(glossary.code).subscribe(
          (response: ResponseModel) => {
            this.successAlertType(response?.message);
            this.handleOnGetGlossaries();
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

  handleOnAddGlossary() {
    this.drawerCreateVisible = true;
    this.modeAction = Utils.WAREHOUSE_ACTION_CREATE;
  }

  handleOnOkModal(event: string) {
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    window.location.reload();
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }

  handleOnChangeCode(code: string) {
    this.glossaryCode = code;
  }

  handleOnChangeObject(object: string) {
    this.glossaryObject = object;
  }

  handleOnCreateGlossary() {
    this.isAuth = false;
    let code = this.validateForm.controls['code'].value;
    let object = this.validateForm.controls['object'].value;
    let userId = this.user.userId;
    let glossary_it: GlossaryModel = {
      code,
      object,
      description: this.validateForm.controls['description_it'].value,
      language: Internationalizations.ITALIAN,
      userId,
    };
    let glossary_es: GlossaryModel = {
      code,
      object,
      description: this.validateForm.controls['description_es'].value,
      language: Internationalizations.SPAIN,
      userId,
    };
    let glossary_fr: GlossaryModel = {
      code,
      object,
      description: this.validateForm.controls['description_fr'].value,
      language: Internationalizations.FRENCH,
      userId,
    };
    let glossary_en: GlossaryModel = {
      code,
      object,
      description: this.validateForm.controls['description_en'].value,
      language: Internationalizations.ENGLISH,
      userId,
    };
    // Convert code to uppercase and object to lowercase
    glossary_it = {
      ...glossary_it,
      code: glossary_it.code.toUpperCase(),
      object: glossary_it.object.toLowerCase(),
    };
    glossary_fr = {
      ...glossary_fr,
      code: glossary_fr.code.toUpperCase(),
      object: glossary_fr.object.toLowerCase(),
    };
    glossary_en = {
      ...glossary_en,
      code: glossary_en.code.toUpperCase(),
      object: glossary_en.object.toLowerCase(),
    };
    glossary_es = {
      ...glossary_es,
      code: glossary_es.code.toUpperCase(),
      object: glossary_es.object.toLowerCase(),
    };

    let glossaries: GlossaryModel[] = [
      glossary_it,
      glossary_es,
      glossary_fr,
      glossary_en,
    ];

    this.configurationService.onCreateGlossary(glossaries).subscribe(
      (response: ResponseModel) => {
        this.successAlertType(response?.message);
        this.validateForm.reset();
        this.handleOnCloseDrawer(Utils.WAREHOUSE_ACTION_CREATE);
        this.handleOnGetGlossaries();
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

  handleOnUpdateGlossary() {
    this.isAuth = false;
    let code = this.updateGlossaryForm.controls['code'].value;
    let object = this.updateGlossaryForm.controls['object'].value;
    let userId = this.user.userId;
    let description = this.updateGlossaryForm.controls['description'].value;
    this.updateGlossary = {
      code,
      object,
      description,
      userId,
      language: this.glossaryLanguage,
    };
    this.updateGlossary = {
      ...this.updateGlossary,
      code: this.updateGlossary.code.toUpperCase(),
      object: this.updateGlossary.object.toLowerCase(),
    };

    console.log(this.updateGlossary);

    this.configurationService
      .onUpdateGlossary(
        this.updateGlossary,
        this.glossaryCode,
        this.glossaryLanguage
      )
      .subscribe(
        (response: ResponseModel) => {
          this.successAlertType(response?.message);
          this.updateGlossaryForm.reset();
          this.handleOnCloseDrawer(Utils.WAREHOUSE_ACTION_UPDATE);
          this.handleOnGetGlossaries();
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

  handleOnCloseDrawer(action: string) {
    if (action === Utils.WAREHOUSE_ACTION_CREATE) {
      this.drawerCreateVisible = false;
    } else if (action === Utils.WAREHOUSE_ACTION_SHOW) {
      this.drawerShowVisible = false;
    } else {
      this.drawerUpdateVisible = false;
    }
    this.modeAction = '';
    this.glossaryCode = '';
    this.glossaryObject = '';
    this.glossaryLanguage = '';
    this.glossaryFlag = '';
    this.validateForm.reset();
  }
}
