import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, first, of} from "rxjs";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  fullName: string = '';
  code: string = '';
  isAdmin: boolean = false;

  constructor(private router: Router, private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  submit(): void {
    if (!this.fullName || !this.code) {
      this.toastr.error('Поля не можуть бути пустими!')
      return;
    }

    this.http.post('http://localhost:3000/login', { fullName: this.fullName, code: this.code })
      .pipe(first(), catchError(err => {
        this.toastr.error('Введені дані не правильні!');
          return EMPTY;
      }))
        .subscribe((res: any) => {
          if (res[0].exist) {
            localStorage.setItem('authorized', 'true');
            this.router.navigate(['/main/schedule']);
          }
          else {
            this.toastr.error('Введені дані не правильні!');
          }
    })
  }

  toggleAdmin(isAdmin: boolean): void {
    this.isAdmin = isAdmin;
  }
}
