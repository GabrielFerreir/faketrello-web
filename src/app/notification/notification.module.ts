import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import {NotificationService} from "./notification.service";
import {ArrowBackModule} from "../components/arrow-back/arrow-back.module";

@NgModule({
  imports: [
    CommonModule,
    ArrowBackModule
  ],
  providers: [NotificationService],
  declarations: [NotificationComponent],
  exports: [NotificationComponent]
})
export class NotificationModule { }
