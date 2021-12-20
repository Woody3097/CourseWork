import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {
  @HostListener('click') click() {
    this.ref.close();
}
  exam: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<any>, private http: HttpClient) {
    this.exam = data;
    let date_ = new Date(this.exam.date);

    const date = date_.getUTCDate();
    const month = date_.getUTCMonth() + 1;
    const year = date_.getUTCFullYear();

    this.exam.date = date + "/" + month + "/" + year;
    this.exam.studentList = [];
    this.http.post('http://localhost:3000/getStudentByGroupId',{ id : this.exam.groupId }).subscribe((res: any) => {
      const list = res;
      list.forEach((el: any) => {
        this.http.post('http://localhost:3000/getStudentNameById', [el.studentId]).pipe(first()).subscribe((data: any) => {
          this.exam.studentList.push(data[0]);
        })
      })
      this.exam.studentList = res;
    })
  }

  ngOnInit(): void {}

}
