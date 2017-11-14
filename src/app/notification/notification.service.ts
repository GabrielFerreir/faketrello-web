import {ElementRef, Injectable} from '@angular/core';
import {CoreService} from '../Services/core.service';
import {DadosDeUsuarioService} from '../Services/dados-de-usuario.service';
import {Http, Headers} from '@angular/http';

@Injectable()
export class NotificationService {
  visibility: boolean;
  notification: ElementRef;
  userNotification;
  arrowBack: ElementRef

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
      try {
        document.querySelector('.container[_ngcontent-c1]').classList.add('overflowHidden');
        document.querySelector('.container[_ngcontent-c1]').classList.remove('overflowAuto');
      } catch (e) {

      }

    } else {
      this.notification.nativeElement.className = 'notificacoes';
      try{
        document.querySelector('.container[_ngcontent-c1]').classList.remove('overflowHidden');
        document.querySelector('.container[_ngcontent-c1]').classList.add('overflowAuto');
      } catch (e) {

      }

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
  changeBooleanNotification() {
    const url = 'http://' + this.core.ipDaApi + '/user/notifications';
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
    return this.http.put(url, {headers: headers})
      .map(res => res.json())
      .subscribe((res) => {
        console.log(res);
      }, error => {
        console.log(error);
      });
  }
  getBooleanNotification() {
    const url = 'http://' + this.core.ipDaApi + '/user/booleanNotifications';
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
    return this.http.put(url, {headers: headers})
      .map(res => res.json())
      .subscribe((res) => {
        console.log(res);
      }, error => {
        console.log(error);
      });
  }

}
