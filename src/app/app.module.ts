import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HttpModule} from '@angular/http';

import 'rxjs/add/operator/map';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {CadastroComponent} from './cadastro/cadastro.component';
import {AlterarDadosDeUsuarioComponent} from './alterar-dados-de-usuario/alterar-dados-de-usuario.component';

import {DadosDeUsuarioResolve} from './dadosDeUsuario.resolve';
import {DadosDeUsuarioService} from './Services/dados-de-usuario.service';
import { CoreService } from './Services/core.service';
import {AlterarSenhaDeUsuarioComponent} from './alterar-senha-de-usuario/alterar-senha-de-usuario.component';
import {SnackbarsModule} from './components/snackbars/snackbars.module';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { HomeComponent } from './home/home.component';
import { EsqueciMinhaSenhaModule } from './esqueci-minha-senha/esqueci-minha-senha.module';
import { AutenticacaoModule } from './components/autenticacao/autenticacao.module';
import { AutenticaComponent } from './autentica/autentica.component';
import { PopupConfirmacaoModule } from './components/popup-confirmacao/popup-confirmacao.module';
import {ProjectsModule} from './projects/projects.module';
import {ProjectsServiceService} from './projects/projects-service.service';
import {DragDropModule} from './drag-drop/drag-drop.module';
import {MenuModule} from './components/menu/menu.module';
import {MenuInfoUserModule} from './components/menu-info-user/menu-info-user.module';
import { MenuInfoUserDirective } from './components/menu-info-user/menu-info-user.directive';
import { ArrowBackComponent } from './components/arrow-back/arrow-back.component';
import {ArrowBackModule} from './components/arrow-back/arrow-back.module';
// import { SocketService } from './Services/socket.service';
import { SocketIoModule, SocketIoConfig} from "ng-socket-io";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const config: SocketIoConfig = {url: '192.168.52.75:3000', options: {}};


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    MainComponent,
    CadastroComponent,
    AlterarDadosDeUsuarioComponent,
    AlterarSenhaDeUsuarioComponent,
    PaginaInicialComponent,
    HomeComponent,
    AutenticaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    EsqueciMinhaSenhaModule,
    SnackbarsModule,
    AutenticacaoModule,
    PopupConfirmacaoModule,
    ProjectsModule,
    DragDropModule,
    MenuModule,
    MenuInfoUserModule,
    ArrowBackModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [DadosDeUsuarioService,
              DadosDeUsuarioResolve,
              CoreService,
              ProjectsServiceService,
              ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
