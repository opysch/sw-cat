// Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { ListComponent } from './pages/list/list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

// Routes
export const routes: Routes = [
  // List
  { path: '', component: ListComponent, pathMatch: 'full' },

  // Profile
  { path: 'profile/:id', component: ProfileComponent, pathMatch: 'full' },

  // Error
  { path: '**', component: NotFoundComponent }
];

// ngModule
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
