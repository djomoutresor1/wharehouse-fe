import { Component, OnInit } from '@angular/core';
import { ProfilService } from 'src/app/services/profil.service';
import { Person } from './../../../../../interfaces/profils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profilData: any;
  myArray: Person[] = [];

  constructor(public profilService: ProfilService) {}

  ngOnInit(): void {

    this.profilData = this.profilService.getDataProfil();
    this.myArray.push(this.profilData);
    console.log('profilData: ', this.myArray);
  }


  hashPassword(password: string){
    return "*".repeat(password.length)
  }
}
