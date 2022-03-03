import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pages } from 'src/app/shared/enums/pages-enums';

@Component({
  selector: 'app-dashboard-rack-detail',
  templateUrl: './dashboard-rack-detail.component.html',
  styleUrls: ['./dashboard-rack-detail.component.scss'],
})
export class DashboardRackDetailComponent implements OnInit {

  rackName: any;

  constructor(private router: Router, private route: ActivatedRoute) {
    console.log('router: ', this.router);
    this.rackName = this.route.snapshot.paramMap.get(Pages.RACK_NAME);
    console.log('rackName: ', this.rackName);
  }

  ngOnInit(): void {}

  handleOnNavigate(url: String) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }
}
