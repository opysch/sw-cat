import { Injectable } from '@angular/core';
import { english } from '../../assets/locale/en';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  public languages: Array<any> = [];
  public items: Array<any> = [];
  public selectedLanguage: any;

  constructor() {
    this.languages.push(english);
    this.selectedLanguage = this.getLanguage();
    this.items = this.selectedLanguage.items;
  }

  getLanguage() {
    return this.languages.find((one: any) => {
      return one.langKey === 'en-US';
    });
  }

  get(key) {
    if (key !== '') {
      if (this.items[key] !== undefined) {
        return this.items[key];

      } else {
        return key;
      }
    }
  }
}
