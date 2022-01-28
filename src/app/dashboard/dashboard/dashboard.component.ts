import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../../app.component.scss'],
})
export class DashboardComponent extends AppComponent implements OnInit {

   alphabet = Array.from(Array(15)).map((e, i) => i + 65);
   //corsie = this.alphabet.map((x) => String.fromCharCode(x));

   arrayCorsie: any = [];

  constructor(private dashboardService: DashboardService) {
    super();
  }

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe((response) => {
      console.log("response: ", response);
      this.arrayCorsie = response;
    })  
  }
}
