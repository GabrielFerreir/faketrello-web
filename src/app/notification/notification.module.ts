import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import {NotificationService} from "./notification.service";
import {ArrowBackModule} from "../components/arrow-back/arrow-back.module";
import { AllNotificationComponent } from './all-notification/all-notification.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    ArrowBackModule,
    RouterModule
  ],
  providers: [NotificationService],
  declarations: [NotificationComponent, AllNotificationComponent],
  exports: [NotificationComponent]
})
export class NotificationModule { }
