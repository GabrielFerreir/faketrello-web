import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import 'rxjs/add/operator/map';

import { AutenticacaoModule } from './autenticacao/autenticacao.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

// import { HomeComponent } from './home/home.component';
// import { LoginModule } from './login/login.module'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { HomeComponent } from './home/home.component';
// import { NewUserComponent } from './new-user/new-user.component';

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    PageNotFoundComponent,
    // HomeComponent,
    // NewUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AutenticacaoModule,
    // LoginModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
