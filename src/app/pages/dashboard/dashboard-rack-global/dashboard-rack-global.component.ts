import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { PathParams } from 'src/app/shared/enums/path-params-enums';

@Component({
  selector: 'app-dashboard-rack-global',
  templateUrl: './dashboard-rack-global.component.html',
  styleUrls: ['./dashboard-rack-global.component.scss']
})
export class DashboardRackGlobalComponent implements OnInit {

  rackName: any;
  corsiaTable: any;
  rackTable:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.rackName = this.route.snapshot.paramMap.get(PathParams.RACK_NAME);
  }

  ngOnInit(): void {
  }

  handleOnNavigate(url: String) {
   this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }

}
