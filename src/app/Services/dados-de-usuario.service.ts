import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';
import {CoreService} from './core.service';

@Injectable()
export class DadosDeUsuarioService {

  constructor(private router: Router,
              private http: Http,
              private core: CoreService) {
  }
  dadosDeUsuario;
  criarCookie(tokken) {
    var data = new Date();
    data.setTime(data.getTime() + (24 * 60 * 60 * 1000))
    // tokken = tokken.substring(1, tokken.length - 1);
    var tokkenCompleto = 'Bearer ' + tokken;
    document.cookie = 'tokken=Bearer ' + tokken + '; expires=' + data.toUTCString() + '; path=/';
    ('Criou o cookie');
    // (this.getCookieTokken());
  }
  getCookieTokken() {
    try {
      var cookie = document.cookie.split('tokken=');
      cookie = cookie[1].split(';');
      var tokkenCookie = cookie[0];
      // ('Pegou o cookie')
      // (tokkenCookie);
    } catch (e) {
      // ('Efetue o login')
      // this.router.navigate(['/home']);
    }
    return tokkenCookie;
  }

 // LOGAR (USERINFO)
  verificaUsuarioLogin(usuario) {
    var url = 'http://' + this.core.ipDaApi + '/userinfo?user=' + usuario;
    return this.http.get(url)
      .map(res => res.json())
  }
  // ALTERAR USUARIO (USERINFO)
  verificaUsuarioExiste(usuario) {
    var url = 'http://' + this.core.ipDaApi + '/usernameInfo?user=' + usuario;
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.getCookieTokken());
    return this.http.get(url, {headers: headers})
      .map(res => res.json())
  }
  gerarTokken(user, pass) {
    const url = 'http://' + this.core.ipDaApi + '/login';
    const json = JSON.stringify(
      {
        user : user,
        password : pass
      }
    );
    const params =  json;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(url, params, { headers: headers })
      .map(res => res.json());
  }
  logar(): any {
    var url = 'http://' + this.core.ipDaApi + '/session';
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.getCookieTokken());
    return this.http.get(url, {headers: headers})
      .map(res => res.json());
  }
  verificaUsuarioAutenticado() {
    if (this.getCookieTokken()) {
      var url = 'http://' + this.core.ipDaApi + '/session';
      var headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.getCookieTokken());
      return this.http.get(url, {headers: headers})
        .map(res => res.json())
        .subscribe((res) => {
            ('Autenticado');
            return true;
          }, error => {
            ('Fazendo logout');
            // this.logout();
            return false;
          });
    } else {
      ('Fazendo logout');
      this.logout();
      return false;
    }
  }
  verificaEmailExiste(email) {
    var url = 'http://' + this.core.ipDaApi + '/emailExists/?user=' + email;
    const headers = new Headers();
    return this.http.get(url, {headers: headers})
      .map(res => res.json())
  }
  recuperarDadosDeUsuario() {
    const url = 'http://' + this.core.ipDaApi + '/user';
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.getCookieTokken());
    return this.http.get(url, {headers: headers}).toPromise();
  }
  alterarDadosDeUsuario(name, username, img, email) {
    const url = 'http://' + this.core.ipDaApi + '/session/change';

    const json = JSON.stringify(
      {
        name: name,
        username: username,
        imgBase64: img,
        email: email
      }
    );

    const params = json;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.getCookieTokken());

    return this.http.put(url, params, {headers: headers})
      .map(res => res.json());
  }
  alterarSenhaDeUsuario(oldpass, newpass) {
    var url = 'http://' + this.core.ipDaApi + '/session/changepassword';
    var json = JSON.stringify(
      {
        oldpass: oldpass,
        newpass: newpass
      }
    );
    var params = json;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.getCookieTokken());

    return this.http.put(url, params, {headers: headers})
      .map(res => res.json())
  }
  autenticacao(tokken) {
    var url = 'http://' + this.core.ipDaApi + '/authentication';
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + tokken);
    return this.http.get(url, {headers: headers})
      .map(res => res.json());
  }
  logout() {
    document.cookie = 'tokken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.router.navigate(['/home']);
  }




}
