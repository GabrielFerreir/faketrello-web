import {ElementRef, Injectable} from '@angular/core';

@Injectable()
export class NotificationService {
  visibility: boolean;
  notification: ElementRef;
  userNotification;

  constructor() { }

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

}
