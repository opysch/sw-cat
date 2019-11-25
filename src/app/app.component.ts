import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';
import { DictionaryService } from './services/dictionary.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public title = 'app';

  // Constructor
  constructor(public sharedService: SharedService, public dictionaryService: DictionaryService, public router: Router) {
  }

  // On initialization
  ngOnInit() {
  }

  navigateHome() {
    this.router.navigate(['/'])
      .then(() => {
        return;
      });
  }
}
