import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sort-item',
  templateUrl: './sort-item.component.html',
  styleUrls: ['./sort-item.component.scss']
})
export class SortItemComponent implements OnInit {
  @Input() public data: string;
  @Output() public sortChangedEvent: EventEmitter<any>;

  constructor(public sharedService: SharedService, public sanitizer: DomSanitizer) {
    this.sortChangedEvent = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  getIconBg(order: string = '') {
    const icon: string = order === 'asc'
      ? this.sharedService.sortAscIco
      : order === 'desc'
        ? this.sharedService.sortDescIco
        : '';

    if (icon !== '') {
      return this.sanitizer.bypassSecurityTrustStyle(`background-image: url(${icon})`);
    }
    return;
  }

  sortItems(target: string = 'id', direction: string = 'asc') {
    this.sortChangedEvent.emit({
      target,
      direction
    });
  }
}
