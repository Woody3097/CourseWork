import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {Statement} from "@angular/compiler";
import {StatementComponent} from "../statement/statement.component";
import {first} from "rxjs";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  selectedGroup: string = '';
  searchedByGroup: boolean = false;
  selectedTeacher: string = '';
  searchedByTeacher: boolean = false;
  allExamsByGroup: number = 0;
  allExamByTeacher: number = 0;

  exams: any = [];

  constructor(private http: HttpClient, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getExamsByGroup(): void {
    if (!this.selectedGroup) {
      this.toastr.error('Введіть дані для пошуку!');
      return;
    }
    this.http.post('http://localhost:3000/getExamsByGroup', { group: this.selectedGroup }).subscribe((res: any) => {
      if (!res?.length) {
        this.toastr.info('Даних не знайдено!');
      }
      else {
        this.toastr.success('Знайдено дані про екзамени!');
        this.searchedByGroup = true
        this.allExamsByGroup = res.length;
        this.exams = res;
        this.exams.forEach((el: any) => {
          el.group_name = this.selectedGroup;
          this.http.post('http://localhost:3000/getTeacherById', {id: el.teacherId}).pipe(first()).subscribe((data: any) => {
            el.full_name = data[0].full_name;
          })
        })
      }
    })
  }

  getExamsByTeacher(): void {
    if (!this.selectedTeacher) {
      this.toastr.error('Введіть дані для пошуку!');
      return;
    }
    this.http.post('http://localhost:3000/getExamsByTeacher', { fullName: this.selectedTeacher }).subscribe((res: any) => {
      debugger
      if (!res?.length) {
        this.toastr.info('Даних не знайдено!');
      }
      else {
        this.toastr.success('Знайдено дані про екзамени!');
        this.searchedByTeacher = true
        this.allExamByTeacher = res.length;
        this.exams = res;
        this.exams.forEach((el: any, index: number) => {
          this.http.post('http://localhost:3000/getGroupById', {id: el.groupId}).pipe(first()).subscribe((data: any) => {
            this.exams[index].group_name = data[0].group_name;
          })
          this.http.post('http://localhost:3000/getTeacherById', {id: el.teacherId}).pipe(first()).subscribe((data: any) => {
            el.full_name = data[0].full_name;
          })
        })

      }
    })
  }

  openStatement(exam: any): void {
    this.dialog.open(StatementComponent, { data: exam });
  }
}
