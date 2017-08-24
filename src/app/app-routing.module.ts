import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
   {path: 'login', component: LoginComponent},
   {path: 'home', component: HomeComponent},
   {path: '**', component: PageNotFoundComponent}
];

@NgModule({
   imports: [RouterModule.forRoot(APP_ROUTES)],
   exports: [RouterModule]
})
export class AppRoutingModule{}
