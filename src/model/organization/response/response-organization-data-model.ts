export interface ResponseOrganizationDataModel {
  organizationId: string;
  organizationName: string;
  organizationDescription: string;
  website: string;
  collaborators: string[];
  referent: string;
  maxNumberCollaborators: string;
  organizationPackage: string;
  trial: boolean;
  startPackage: string;
  endPackage: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
