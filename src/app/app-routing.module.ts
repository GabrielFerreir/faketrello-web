import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AutenticacaoComponent } from './autenticacao/autenticacao.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MainComponent } from './main/main.component';
import { AlterarDadosDeUsuarioComponent } from './alterar-dados-de-usuario/alterar-dados-de-usuario.component';
import { HomeComponent } from './home/home.component';
import { DoneComponent} from "./autentication/done/done.component";

import { DadosDeUsuarioResolve } from "./dadosDeUsuario.resolve";
import { PendentComponent } from "./autentication/pendent/pendent.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlterarSenhaDeUsuarioComponent} from "./alterar-senha-de-usuario/alterar-senha-de-usuario.component";


const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent },
  {path: 'cadastro', component: CadastroComponent},
  {path: 'authentication/:id', component: PendentComponent },
  {path: 'emailNaoAutenticado', component: DoneComponent},
  {path: '', component: MainComponent, children:[
      {path: 'home', component: HomeComponent},

      {path: 'alterarDados',
      component: AlterarDadosDeUsuarioComponent,
      resolve: {
          alterar: DadosDeUsuarioResolve
        }
      },
    {path: 'alterarSenha',
    component: AlterarSenhaDeUsuarioComponent,
      resolve: {
        alterar: DadosDeUsuarioResolve
      }
    }

    ]},
  //  {path: 'home', component: HomeComponent},
   {path: '**', component: PageNotFoundComponent}
];

@NgModule({
   imports: [RouterModule.forRoot(APP_ROUTES)],
   exports: [RouterModule]
})
export class AppRoutingModule{}
