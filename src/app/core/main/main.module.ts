import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from '../header/header.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { StudentComponent } from '../student/student.component';
import { TeacherComponent } from '../teacher/teacher.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    ScheduleComponent,
    StudentComponent,
    TeacherComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class MainModule { }
