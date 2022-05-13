import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Internationalizations } from '../../enums/internationalizations-enums';
import { Languages } from '../../enums/languages-enums';

@Component({
  selector: 'warehouse-multilanguage',
  templateUrl: './multilanguage.component.html',
  styleUrls: ['./multilanguage.component.scss']
})
export class MultilanguageComponent implements OnInit {

  language: string = Internationalizations.ENGLISH;
  countries: any[] = [
    {
      img: '../../../../../assets/countrie-flags/gb.png',
      code: Internationalizations.ENGLISH,
      name: Languages.ENGLISH,
    },
    {
      img: '../../../../../assets/countrie-flags/it.png',
      code: Internationalizations.ITALIAN,
      name: Languages.ITALIAN,
    },
    {
      img: '../../../../../assets/countrie-flags/fr.png',
      code: Internationalizations.FRENCH,
      name: Languages.FRENCH,
    },
  ];

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.setDefaultLang(this.language);
    this.translate.use(this.language);
  }

  handleOnChangeLanguage() {
    const language = this.language || 'en';
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    //this.translateText();
  }
  
  handleOnFlagSelected(flag: any): string {
    let country = this.countries?.find(country => country?.code === flag?.nzValue);
    return country?.img;
  }
}
