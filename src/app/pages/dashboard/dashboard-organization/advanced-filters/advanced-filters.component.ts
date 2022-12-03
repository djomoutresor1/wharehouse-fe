import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { ResponseOrganizationModel } from 'src/model/organization/response/response-organization-model';
import { HeaderTableModel } from 'src/model/utils/header-table-model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'warehouse-advanced-filters-organizations',
  templateUrl: './advanced-filters.component.html',
  styleUrls: ['./advanced-filters.component.scss'],
})
export class AdvancedFiltersOrganizationsComponent
  extends WarehouseBaseComponent
  implements OnInit
{
  @Input() headersTable: HeaderTableModel[] = [];
  @Input() warehouseOrganizations: ResponseOrganizationModel[] = [];
  @Input() tmpOrganizations: ResponseOrganizationModel[] = [];
  @Output() handleOnNotifyHeadersTable: EventEmitter<HeaderTableModel[]> =
    new EventEmitter<HeaderTableModel[]>();
  @Output() handleOnNotifyOrganizationsFiltered: EventEmitter<
    ResponseOrganizationModel[]
  > = new EventEmitter<ResponseOrganizationModel[]>();
  @Output() handleOnNotifyResetFilter: EventEmitter<any> =
    new EventEmitter<any>();

  organizationsFiltered: ResponseOrganizationModel[] = [];
  search: string = '';
  searchForm!: FormGroup;
  showHidePanel: boolean = false;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    this.initSearch();
  }

  initSearch() {
    this.searchForm = this.fb.group({
      search: '',
      createdAt: [],
      selectedOption: '',
    });
  }

  handleOnSearchOrganizations() {
    let search = this.searchForm.controls['search']?.value;

    this.handleOnSearchOrganization(search);

    this.handleOnNotifyOrganizationsFiltered.emit(this.organizationsFiltered);
  }

  handleOnSearchOrganization(search: string) {
    if (search) {
      this.organizationsFiltered = this.tmpOrganizations.filter(
        (organization: ResponseOrganizationModel) =>
          organization.organization.organizationName
            .toLowerCase()
            .indexOf(search.toLowerCase()) >= 0 ||
          organization.organization.website
            .toLowerCase()
            .indexOf(search.toLowerCase()) >= 0
      );
    } else {
      this.organizationsFiltered = this.tmpOrganizations;
    }
  }

  handleOnSearchClear() {
    this.search = '';
    this.searchForm.controls['search'].reset();
    this.handleOnSearchOrganizations();
  }

  handleOnShowHidePanel() {
    //this.headersTable = this.tmpHeadersTable;
    this.showHidePanel = !this.showHidePanel;
  }

  handleOnSelectedOption(headerIndex: number, value: boolean) {
    this.headersTable.map((header, index) =>
      index === headerIndex ? { ...header, show: !value } : header
    );
    //this.tmpHeadersTable = this.headersTable;
    this.handleOnNotifyHeadersTable.emit(this.headersTable);
  }

  handleOnExportOrganizations() {
    let organizations = !!this.organizationsFiltered?.length
      ? this.organizationsFiltered
      : this.warehouseOrganizations;
    const csvOrganization = organizations?.map(
      (organization: ResponseOrganizationModel) => {
        return {
          OrganizationID: organization.organization.organizationId,
          Name: organization.organization.organizationName,
          Responsable: organization.organization.referent,
          Website: organization.organization.website,
          Collaborators: organization.organization.collaborators.length,
          Package: organization.organization.organizationPackage,
          Trial: organization.organization.trial,
          StartPackage: organization.organization.startPackage,
          EndPackage: organization.organization.endPackage,
          Country: organization.organizationAddress.country,
          State: organization.organizationAddress.state,
          ZipCode: organization.organizationAddress.zipCode,
          AddressLine: organization.organizationAddress.addressLine,
          Phone: organization.organizationContact.phonePrefix
            ? organization.organizationContact.phonePrefix +
              ' ' +
              organization.organizationContact.phoneNumber
            : '',
          Landline: organization.organizationContact.landlinePrefix
            ? organization.organizationContact.landlinePrefix +
              ' ' +
              organization.organizationContact.landlineNumber
            : '',
          CreatedAt: organization.organization.createdAt,
        };
      }
    );
    const workBook = XLSX.utils.book_new(); // Create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(csvOrganization);

    XLSX.utils.book_append_sheet(
      workBook,
      workSheet,
      'Organizations WareHouse System'
    ); // Add the worksheet to the book
    XLSX.writeFile(workBook, 'warehouse_organizations.xlsx'); // Initiate a file download in browser
  }
}
