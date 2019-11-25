import { Component, OnInit, HostListener } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SharedService } from '../../services/shared.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  public isError: boolean;
  public isLoading: boolean;
  public curPage: number;
  public listItems: Array<any>;
  public planetsList: Array<any>;
  public sortItems: Array<any>;
  public filterItems: Array<any>;
  public sortOrder: any;
  public filters: any;

  constructor(public httpService: HttpService, public sharedService: SharedService) {
    this.isError = false;
    this.isLoading = false;
    this.curPage = 1;
    this.sortItems = ['HEIGHT', 'MASS'];
    this.filterItems = [
      { name: 'NAME', filterType: 'input'},
      { name: 'GENDER', filterType: 'checkbox', options: []},
      { name: 'PLANET', filterType: 'dropdown', options: []},
    ];
    this.sortOrder = {
      direction: 'asc',
      target: 'id'
    };
    this.filters = {};
  }

  ngOnInit() {
    this.isLoading = true;
    this.listItems = [];
    if (this.sharedService.allCharacters.length) {
      this.listItems = _.cloneDeep(this.sharedService.allCharacters);

    } else {
      this.sharedService.allCharacters = [];
      this.getListItems();
    }
  }

  getListItems(what: string = 'people') {
    let items: Array<any> = [];
    let characterGenders: any;
    this.getListRequest(what).subscribe((response: any) => {
      if (response.results && response.results.length) {
        items = this.sharedService.parseItems(response.results);
        if (what === 'people') {
          this.sharedService.allCharacters = [...this.sharedService.allCharacters, ...items];
          this.listItems = _.cloneDeep(this.sharedService.allCharacters);
          characterGenders = _.find(this.filterItems, {name: 'GENDER'});
          characterGenders.options = _.uniq(_.map(this.sharedService.allCharacters, 'gender'));

        } else {
          this.sharedService.allPlanets = [...this.sharedService.allPlanets, ...items];
        }

        if (response.next !== null) {
          this.curPage++;
          this.getListItems(what);
        } else {
          if (what === 'people') {
            what = 'planets';
            this.curPage = 1;
            this.getListItems(what);
          } else {
            this.parsePlanets();
          }
          this.isLoading = false;
        }

        this.isError = false;

      } else {
        this.isLoading = false;
        this.isError = true;
      }
    }, () => {
      this.isLoading = false;
      this.isError = true;
    });
  }

  onSortChanged(event) {
    this.sortOrder = {
      direction: event.direction,
      target: event.target.toLowerCase()
    };
    this.applySorting();
  }

  filterChangedEvent(event) {
    console.log(event);
    if (event.param && event.param.length) {
      if (event.values && event.values.length) {
        this.filters[event.param] = event.values;

      } else {
        if (this.filters.hasOwnProperty(event.param)) {
          delete this.filters[event.param];
        }
      }
    }
    this.applyFilters();
  }

  applySorting() {
    this.listItems = this.sortOrder.direction === 'asc'
      ? _.sortBy(this.listItems, [this.sortOrder.target])
      : _.reverse(_.sortBy(this.listItems, [this.sortOrder.target]));
  }

  applyFilters() {
    let param: string;
    let values: Array<string>;
    let currentFilter: any;

    this.listItems = _.cloneDeep(this.sharedService.allCharacters);
    _.forEach(this.filters, (v, k) => {
      currentFilter = _.find(this.filterItems, { name: k });
      param = k.toLowerCase();

      if (currentFilter.filterType === 'checkbox') {
        values = v.split(',');
        this.listItems = _.filter(this.listItems, (one) => values.includes(one[param]) );

      } else {
        if (param === 'planet') {
          param = 'homeworld';
          v = _.find(this.planetsList, {name: v});
          if (v) {
            this.listItems = _.filter(this.listItems, (one) => one[param] === v.id );
          }
        } else {
          this.listItems = _.filter(this.listItems, (one) => one[param].toLowerCase().includes(v.toLowerCase()) );
        }
      }
    });
    this.applySorting();
  }

  parsePlanets() {
    let onePlanet: any;
    let planets: any;
    this.planetsList = [];
    for (let i = 0; i < this.sharedService.allPlanets.length; i++) {
      onePlanet = this.sharedService.allPlanets[i];
      if (onePlanet.name && onePlanet.url) {
        this.planetsList.push({
          id: onePlanet.url,
          name: onePlanet.name
        });
      }
    }
    planets = _.find(this.filterItems, {name: 'PLANET'});
    planets.options = _.map(this.planetsList, 'name');
  }

  getListRequest(what: string) {
    what += '/';
    return this.httpService.get(what, { page: this.curPage });
  }
}
