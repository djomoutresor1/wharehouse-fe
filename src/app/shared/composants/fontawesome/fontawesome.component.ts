import { Component, Input, OnInit } from '@angular/core';
import { faAppleWhole, faBowlFood, faBroom, faCarBattery, faCat, faChildDress, faGamepad, faGift, faHouse, faPerson,faPlateWheat, faPumpSoap, faShirt, faShoePrints, faWineGlass } from '@fortawesome/free-solid-svg-icons';
import {faEnvira, faWindows } from '@fortawesome/free-brands-svg-icons';


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

  iconValues (type: string) {
    return  {
      'FOOD': faBowlFood,
      'UTENSILERIA': faPlateWheat,
      'DETERGENTE': faPumpSoap,
      'FIORI': faEnvira,
      'SCARPE UOMO': faShoePrints,
      'TEXTILE': faShirt,
      'VESTITO': faShirt,
      'GIARDINAGGIO': faBroom,
      'BAZAR': faGift,
      'ANIMALERIA': faCat,
      'GIOCATOLI': faGamepad,
      'FERAMENTA': faWindows,
      'VINO': faWineGlass,
      'INTIMO UOMO': faPerson,
      'SUCCO DI FRUTTA': faAppleWhole,
      'ELETTRONICA': faCarBattery,
      'INTIMO DONNA': faChildDress,
      'CASA': faHouse,
    }[type];
  }

}
