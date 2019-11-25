import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { SharedService } from '../../services/shared.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public subscriptions: Array<Subscription>;
  public routeParams: any;
  public isError: boolean;
  public isLoading: boolean;
  public isSamePlanet: boolean;
  public heroId: number;
  public planetId: number;
  public planetName: string;
  public hero: any;
  public planet: any;
  public planetResidents: Array<any>;

  constructor(public router: Router, public route: ActivatedRoute, public httpService: HttpService, public sharedService: SharedService) {
    this.isError = false;
    this.isLoading = false;
    this.isSamePlanet = false;
    this.planetName = '';
    this.routeParams = {};
    this.subscriptions = [];
    this.hero = {};
    this.planet = {};
    this.planetResidents = [];
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe((params: any) => {
      if (params && params.id && !isNaN(+params.id)) {
        this.heroId = +params.id;
        this.isLoading = true;
        this.loadProfile();
      } else {
        this.isError = true;
      }
    }));
  }

  loadProfile() {
    this.getProfileRequest().subscribe((response: any) => {
      if (response.name) {
        this.hero = _.cloneDeep(this.sharedService.parseItems([response])[0]);
        if (this.hero.homeworld && !isNaN(this.hero.homeworld) && this.hero.homeworld > 0) {
          this.isSamePlanet = (this.planetId && this.planetId === this.hero.homeworld);
          this.planetId = this.isSamePlanet ? this.planetId : this.hero.homeworld;

          if (!this.isSamePlanet) {
            this.getPlanetWithResidents();
          } else {
            this.isLoading = false;
            this.isError = false;
          }

        } else {
          this.isLoading = false;
          this.isError = true;
        }
      }
    }, () => {
      this.isLoading = false;
      this.isError = true;
    });
  }

  getPlanetWithResidents() {
    let resident: any = {};
    // Getting Homeworld Planet Data
    this.getPlanetRequest().subscribe((planet: any) => {
      this.planet = _.cloneDeep(this.sharedService.parseItems([planet])[0]);
      this.planetName = this.planet.name;

      // Getting All Charactes from this Planet except Hero
      if (this.planet.residents) {
        this.planet.residents = _.without(this.planet.residents, this.heroId);

        if (this.planet.residents.length) {
          this.planetResidents = [];
          for (let i = 0; i < this.planet.residents.length; i++) {
            this.getProfileRequest(this.planet.residents[i]).subscribe((oneResident: any) => {
              resident = this.sharedService.parseItems([oneResident])[0];
              resident.id = this.planet.residents[i];
              this.planetResidents.push(resident);
              this.isLoading = false;
              this.isError = false;
            });
          }
        } else {
          this.isLoading = false;
        }
      }
    });
  }

  getProfileRequest(id: number = this.heroId) {
    return this.httpService.get(`people/${id}/`);
  }

  getPlanetRequest() {
    return this.httpService.get(`planets/${this.planetId}/`);
  }
}
