import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() typeAlert: any;
  @Input() MessageTest: any;




  constructor() { }

  ngOnInit(): void {
  }

}


