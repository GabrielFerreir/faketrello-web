import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HttpModule} from '@angular/http';

import 'rxjs/add/operator/map';

// import { AutenticacaoModule } from './autenticacao/autenticacao.module';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';

// import { HomeComponent } from './home/home.component';
// import { LoginModule } from './login/login.module'
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {CadastroComponent} from './cadastro/cadastro.component';
import {AlterarDadosDeUsuarioComponent} from './alterar-dados-de-usuario/alterar-dados-de-usuario.component';

import {DadosDeUsuarioResolve} from "./dadosDeUsuario.resolve";
import {DadosDeUsuarioService} from './dados-de-usuario.service';
import {AlterarSenhaDeUsuarioComponent} from './alterar-senha-de-usuario/alterar-senha-de-usuario.component';
import {SnackbarsModule} from './components/snackbars/snackbars.module';
import { PendentComponent } from './autentication/pendent/pendent.component';
import { DoneComponent } from './autentication/done/done.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { HomeComponent } from './home/home.component';
import { EsqueceuSuaSenhaComponent } from './esqueceu-sua-senha/esqueceu-sua-senha.component';

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    PageNotFoundComponent,
    LoginComponent,
    MainComponent,
    CadastroComponent,
    AlterarDadosDeUsuarioComponent,
    AlterarSenhaDeUsuarioComponent,
    PendentComponent,
    DoneComponent,
    PaginaInicialComponent,
    HomeComponent,
    EsqueceuSuaSenhaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SnackbarsModule
  ],
  providers: [DadosDeUsuarioService,
    DadosDeUsuarioResolve],
  bootstrap: [AppComponent]
})
export class AppModule {

}
