import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { Internationalizations } from '../../enums/internationalizations-enums';
import { Languages } from '../../enums/languages-enums';
import { Utils } from '../../enums/utils-enums';

@Component({
  selector: 'warehouse-multilanguage',
  templateUrl: './multilanguage.component.html',
  styleUrls: ['./multilanguage.component.scss'],
})
export class MultilanguageComponent implements OnInit {
  selectedLanguage: string = '';
  dropDownLanguage: any[] = [];

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

  constructor(
    private translate: TranslateService,
    private warehouseLocalStorage: WarehouseLocalStorage
  ) {}

  ngOnInit(): void {
    this.setLanguage();
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  setLanguage() {
    let userLang: any;
    if (
      !!this.warehouseLocalStorage.WarehouseGetLanguageLocalStorage()?.length
    ) {
      userLang = this.warehouseLocalStorage.WarehouseGetLanguageLocalStorage();
    } else {
      userLang = navigator.language || (navigator as any).userLanguage;
    }

    this.dropDownLanguage = [
      { name: Languages.ENGLISH, code: Internationalizations.ENGLISH },
      { name: Languages.FRENCH, code: Internationalizations.FRENCH },
      { name: Languages.ITALIAN, code: Internationalizations.ITALIAN },
    ];

    const langs = this.dropDownLanguage?.map((language) => language?.code);

    this.translate.addLangs(langs);

    this.translate.setDefaultLang(Internationalizations.ENGLISH);
    if (this.translate.langs.includes(userLang)) {
      this.translate.use(userLang);
      this.selectedLanguage = this.dropDownLanguage?.find(
        (language) => language?.code === userLang
      ).code;
    } else {
      switch (userLang.split('-')[0]) {
        case 'it':
          this.translate.use(Internationalizations.ITALIAN);
          this.selectedLanguage = Internationalizations.ITALIAN;
          break;
        case 'fr':
          this.translate.use(Internationalizations.FRENCH);
          this.selectedLanguage = Internationalizations.FRENCH;
          break;
        case 'en':
        default:
          this.translate.use(Internationalizations.ENGLISH);
          this.selectedLanguage = Internationalizations.ENGLISH;
          break;
      }
    }
  }

  handleOnChangeLanguage(lang: string) {
    localStorage.setItem(Utils.WAREHOUSE_USER_LANGUAGE, lang);
    const selectedLang = this.dropDownLanguage?.find(
      (language) => language.code === lang
    );
    this.selectedLanguage = selectedLang?.code;
    this.translate.use(lang);
  }

  handleOnFlagSelected(flag: any): string {
    let country = this.countries?.find(
      (country) => country?.code === flag?.nzValue
    );
    return country?.img;
  }
}
