import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss'],
  providers: [ NgbDropdownConfig ]
})

export class FilterItemComponent implements OnInit {
  @Input() public data: any;
  @Input() public id: any;
  @Input() public isLoading: boolean;
  @Output() public filterChangedEvent: EventEmitter<any>;
  public inputTimeout: any;
  public delayTimer: any;
  public filterPlanet: any;
  public listPlanet: any;

  constructor(public sharedService: SharedService, public sanitizer: DomSanitizer, public ddConfig: NgbDropdownConfig) {
    ddConfig.autoClose = false;
    this.delayTimer = null;
    this.inputTimeout = 500;
    this.filterChangedEvent = new EventEmitter<any>();

  }

  ngOnInit() {

  }

  onFilterCheckboxChange() {
    let checkedList: string;
    const checkboxes: NodeListOf<Element> = document.querySelectorAll('.form-check-input');
    checkedList = _.map(_.filter(checkboxes, {checked: true}), 'name').join(',');

    this.filterChangedEvent.emit({
      param: this.data.name,
      values: checkedList
    });
  }

  onFilterInputChange($event) {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
    }
    this.delayTimer = setTimeout(() => {
      if ($event && $event.target) {
        this.filterChangedEvent.emit({
          param: $event.target.name,
          values: $event.target.value
        });
      }

    }, this.inputTimeout);
  }

  onFilterDropdownChange($event) {
    if (this.data.options.includes($event)) {
      this.filterChangedEvent.emit({
        param: this.data.name,
        values: $event
      });
    } else if ($event === '') {
      this.filterChangedEvent.emit({
        param: this.data.name,
        values: ''
      });
    }
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.data.options.filter(v => v.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10))
    )
}

