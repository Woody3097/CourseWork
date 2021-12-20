import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  full_name: string = '';
  code: string = '';
  full_name_student: string = '';
  code_student: string = '';
  position: string = '';
  group: string = '';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addStudent(): void {
    this.http.post('http://localhost:3000/addStudent', {full_name: this.full_name_student, code: this.code_student, group: this.group}).subscribe((res: any) => {
      if (res[0].insertId) {
        this.toastr.success('Користувача додано!');
      }
    })
  }

  addTeacher(): void {
    this.http.post('http://localhost:3000/addTeacher', {full_name: this.full_name, code: this.code, position: this.position}).subscribe((res: any) => {
      if (res[0].insertId) {
        this.toastr.success('Користувача додано!');
      }
    })
  }
}
