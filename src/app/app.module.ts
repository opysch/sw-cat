import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ListComponent } from './pages/list/list.component';
import { ListItemComponent } from './shared/list-item/list-item.component';

// Services
import { HttpService } from './services/http.service';
import { HeadItemsService } from './services/head-items.service';
import { DictionaryService } from './services/dictionary.service';

import { DictionaryPipe } from './pipes/dictionary.pipe';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ErrorComponent } from './shared/error/error.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LinkedCharacterComponent } from './shared/linked-character/linked-character.component';
import { SortItemComponent } from './shared/sort-item/sort-item.component';
import { FilterItemComponent } from './shared/filter-item/filter-item.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ListComponent,
    ListItemComponent,
    DictionaryPipe,
    NotFoundComponent,
    ErrorComponent,
    SpinnerComponent,
    LinkedCharacterComponent,
    SortItemComponent,
    FilterItemComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [
    HttpService,
    HeadItemsService,
    DictionaryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
