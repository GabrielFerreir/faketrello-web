import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarsComponent } from './snackbars.component';
import { SnackbarsService } from "./snackbars.service";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SnackbarsComponent],
  exports: [SnackbarsComponent],
  providers: [SnackbarsService]
})
export class SnackbarsModule { }
