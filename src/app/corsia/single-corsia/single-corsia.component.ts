import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-single-corsia',
  templateUrl: './single-corsia.component.html',
  styleUrls: ['./single-corsia.component.scss', '../../app.component.scss']
})
export class SingleCorsiaComponent extends AppComponent implements OnInit {

  @Input() name: string = "";

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

}
