import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HeadItemsService {
  public headItems: Array<any>;

  constructor() {
    this.headItems = [
      {name: 'Name'},
      {name: 'Gender'},
      {name: 'Year of Birth'},
      {name: 'Planet'}
    ];
  }
}
