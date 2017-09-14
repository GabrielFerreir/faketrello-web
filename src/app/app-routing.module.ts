import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AutenticacaoComponent } from './autenticacao/autenticacao.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MainComponent } from './main/main.component';
import { AlterarDadosDeUsuarioComponent } from './alterar-dados-de-usuario/alterar-dados-de-usuario.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { HomeComponent} from './home/home.component';
import { EsqueciMinhaSenhaComponent } from './esqueci-minha-senha/esqueci-minha-senha';
import { EsqueceuSuaSenhaComponent } from './esqueci-minha-senha/esqueceu-sua-senha/esqueceu-sua-senha.component';
import { EsqueceuSeuSenhaAlterarComponent } from './esqueci-minha-senha/esqueceu-seu-senha-alterar/esqueceu-seu-senha-alterar.component';
import { AutenticaComponent } from './autentica/autentica.component';
import { DadosDeUsuarioResolve } from './dadosDeUsuario.resolve';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlterarSenhaDeUsuarioComponent} from './alterar-senha-de-usuario/alterar-senha-de-usuario.component';


const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'login', component: LoginComponent },
  {path: 'cadastro', component: CadastroComponent},
  {path: 'authentication/:id', component: AutenticaComponent},
  {path: 'esqueciMinhaSenha', component: EsqueciMinhaSenhaComponent, children:[
    {path: '', component: EsqueceuSuaSenhaComponent},
    {path: 'alterarSenha', component: EsqueceuSeuSenhaAlterarComponent}
  ]},



    {path: '', component: MainComponent, children:[
          {path: 'main', component: PaginaInicialComponent},

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
   {path: 'home', component: HomeComponent},
   {path: '**', component: PageNotFoundComponent}
];

@NgModule({
   imports: [RouterModule.forRoot(APP_ROUTES)],
   exports: [RouterModule]
})
export class AppRoutingModule{}
