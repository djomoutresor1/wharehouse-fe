import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'fontawesome',
  templateUrl: './fontawesome.component.html',
  styleUrls: ['./fontawesome.component.scss']
})
export class FontawesomeComponent implements OnInit {
  @Input() iconType:any;

  constructor() { }

  ngOnInit(): void {
  }

}
