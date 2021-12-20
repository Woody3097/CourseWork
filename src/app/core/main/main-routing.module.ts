import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScheduleComponent} from "../schedule/schedule.component";
import {StudentComponent} from "../student/student.component";
import {TeacherComponent} from "../teacher/teacher.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'schedule',
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
        path: '**',
        redirectTo: 'schedule',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
