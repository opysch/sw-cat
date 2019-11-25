import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-linked-character',
  templateUrl: './linked-character.component.html',
  styleUrls: ['./linked-character.component.scss']
})
export class LinkedCharacterComponent implements OnInit {
  @Input() public data: any;

  constructor(public router: Router) {
    this.data = {};
  }

  ngOnInit() {
  }

  navigateTo(id: number = 0) {
    if (id > 0) {
      this.router.navigate([`/profile/${id}`])
        .then(() => {
          return;
        });
    }
  }
}
