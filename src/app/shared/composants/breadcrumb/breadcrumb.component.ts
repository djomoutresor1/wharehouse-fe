import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbItemsModel } from 'src/model/utils/breadcrumb-items-model';
import { Pages } from '../../enums/pages-enums';

@Component({
  selector: 'warehouse-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  constructor(private router: Router, private translate: TranslateService) {}

  @Input() items!: BreadcrumbItemsModel;

  ngOnInit(): void {
    console.log('Items: ', this.items);
  }

  handleOnNavigate(url: string | undefined) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }

  getBreadcrumbParentTitle(title: string | undefined) {
    return this.translate.instant(title as string);
  }

  getBreadcrumbChildTitle(index: number) {
    let element = this.items?.children?.find((child, i) => i === index);
    return this.translate.instant(element?.title as string);
  }
}
