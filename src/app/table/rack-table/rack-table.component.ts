import { Component, Input, OnInit } from '@angular/core';
import { RackModel } from 'src/model/rack/rack-model';
import {
  faAppleWhole,
  faBowlFood,
  faBroom,
  faCarBattery,
  faCat,
  faChildDress,
  faGamepad,
  faGift,
  faHouse,
  faPerson,
  faPlateWheat,
  faPumpSoap,
  faShirt,
  faShoePrints,
  faWineGlass,
} from '@fortawesome/free-solid-svg-icons';
import { faEnvira, faWindows } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'rackTable',
  templateUrl: './rack-table.component.html',
  styleUrls: ['./rack-table.component.scss'],
})
export class RackTableComponent implements OnInit {
  @Input() racks: RackModel[] = [];
  @Input() typeProduct: String = ' ';


  id:any


  

  rackFormat: RackModel[] = [];
  constructor() {}

  //positions des palettes dans les diverse ripiani
  positions = ['A', 'B', 'C'];

  ngOnInit(): void {
    console.log('racks: ', this.racks);
  }

  iconValues(type: string) {
    return {
      FOOD: faBowlFood,
      UTENSILERIA: faPlateWheat,
      DETERGENTE: faPumpSoap,
      FIORI: faEnvira,
      'SCARPE UOMO': faShoePrints,
      TEXTILE: faShirt,
      VESTITO: faShirt,
      GIARDINAGGIO: faBroom,
      BAZAR: faGift,
      ANIMALERIA: faCat,
      GIOCATOLI: faGamepad,
      FERAMENTA: faWindows,
      VINO: faWineGlass,
      'INTIMO UOMO': faPerson,
      'SUCCO DI FRUTTA': faAppleWhole,
      ELETTRONICA: faCarBattery,
      'INTIMO DONNA': faChildDress,
      CASA: faHouse,
    }[type];
  }
  getBackgroundColorOne(rack: RackModel): any {
    if (rack.rackThree === 0) {
      return 'backgroundFreePlace';
    } else return '';
  }


  getBackgroundColorTwo(rack:RackModel): any{
    if(rack.rackSix===0){
      return 'backgroundFreePlace'
    }else
   return ''
}

getBackgroundColorThree(rack:RackModel): any{
  if(rack.rackNine===0){
    return 'backgroundFreePlace'
  }else
 return ''
}

myFunction(){
  alert("my gfgchvjbk")
}

}
