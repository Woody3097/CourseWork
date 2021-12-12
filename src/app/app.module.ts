import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { StudentComponent } from './core/student/student.component';
import { TeacherComponent } from './core/teacher/teacher.component';
import { ScheduleComponent } from './core/schedule/schedule.component';
import {RouterModule} from "@angular/router";

const routes = [
  {
    path: 'main',
    component: ScheduleComponent,
  },
  {
    path: 'student',
    component: StudentComponent,
  },
  {
    path: 'teacher',
    component: TeacherComponent,
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentComponent,
    TeacherComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
