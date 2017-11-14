import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProjectsComponent } from './add-projects/add-projects.component';
import {ProjectsServiceService} from './projects-service.service';
import { FormsModule } from '@angular/forms';
import { SnackbarsModule } from '../components/snackbars/snackbars.module';
import { AlterarProjectsComponent } from './alterar-projects/alterar-projects.component';
import {ArrowBackModule} from '../components/arrow-back/arrow-back.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SnackbarsModule,
    ArrowBackModule,
  ],
  declarations: [
    AddProjectsComponent,
    AlterarProjectsComponent,
  ],
  providers: [
    ProjectsServiceService
  ],
  exports: [
    AddProjectsComponent,
    AlterarProjectsComponent
  ]
})
export class ProjectsModule { }
