import {ElementRef, Injectable} from '@angular/core';
import {CoreService} from '../Services/core.service';
import {DadosDeUsuarioService} from '../Services/dados-de-usuario.service';
import {Http, Headers} from '@angular/http';

@Injectable()
export class NotificationService {
  visibility: boolean;
  notification: ElementRef;
  userNotification;

  constructor(private http: Http,
              private dados: DadosDeUsuarioService,
              private core: CoreService) { }

  changeVisibility() {
    this.visibility = !this.visibility;
    this.hiddenVisibility();
  }
  hiddenVisibility() {
    if(this.visibility) {
      this.notification.nativeElement.className = 'notificacoes visibility';
    } else {
      this.notification.nativeElement.className = 'notificacoes';
    }
  }
  searchNotification() {
    var url = 'http://' + this.core.ipDaApi + '/user/notifications';
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
    return this.http.get(url, {headers: headers})
      .map(res => res.json())
      .subscribe((res) => {
        console.log(res);
        this.userNotification = res;
      }, error => {
        console.log(error);
      });
  }

}
