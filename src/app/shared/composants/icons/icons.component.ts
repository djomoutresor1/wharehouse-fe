import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  @Input() iconType: String = " ";

  constructor() { }

  ngOnInit(): void {
  }

}
