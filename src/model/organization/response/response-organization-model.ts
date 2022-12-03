import { ResponseAddressModel } from 'src/model/auth/response/response-address-model';
import { ResponseContactModel } from 'src/model/auth/response/response-contact-model';
import { ResponseOrganizationDataModel } from './response-organization-data-model';

export interface ResponseOrganizationModel {
  organization: ResponseOrganizationDataModel;
  organizationAddress: ResponseAddressModel;
  organizationContact: ResponseContactModel;
}
