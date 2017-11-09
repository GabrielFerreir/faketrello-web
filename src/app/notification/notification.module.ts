import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import {NotificationService} from "./notification.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [NotificationService],
  declarations: [NotificationComponent],
  exports: [NotificationComponent]
})
export class NotificationModule { }
