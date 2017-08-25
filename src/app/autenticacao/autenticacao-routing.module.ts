import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoComponent } from './autenticacao.component';
import { LoginUserComponent } from './login-user/login-user.component';
// import { LoginPassComponent } from './login-pass/login-pass.component';


const AUTENTICACAO_ROUTES: Routes = [

   {path: 'autenticacao', component: AutenticacaoComponent, children: [
     {path: 'login-user', component: LoginUserComponent},
    //  {path: 'login-pass', component: LoginPassComponent},

   ] },
  //  {path: 'home', component: HomeComponent},
];

@NgModule({
   imports: [RouterModule.forRoot(AUTENTICACAO_ROUTES)],
   exports: [RouterModule]
})
export class AutenticacaoRoutingModule{}
