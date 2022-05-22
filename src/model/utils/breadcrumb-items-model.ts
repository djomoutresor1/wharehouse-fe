export interface BreadcrumbItemsModel {
  parent: BreadcrumbParent;
  children?: BreadcrumbParent[];
}

export interface BreadcrumbParent {
  title: string;
  url?: string;
}
