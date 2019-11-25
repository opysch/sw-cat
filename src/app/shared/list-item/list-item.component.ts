import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() data: any;

  constructor(public sharedService: SharedService, public router: Router) {

  }

  ngOnInit() {
  }

  gotoProfile(id: number = 0) {

    if (id > 0) {
      this.router.navigate([`/profile/${id}`])
        .then(() => {
          return;
        });
    }
  }
}
