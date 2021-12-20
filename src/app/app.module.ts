import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './core/sign-in/sign-in.component';
import { MainComponent } from "./core/main/main.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconModule } from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {HttpClientModule} from "@angular/common/http";
import {SignInGuard} from "./core/sign-in/sign-in.guard";
import { StatementComponent } from './core/statement/statement.component';
import {MatDialogModule} from "@angular/material/dialog";

const routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [SignInGuard],
    loadChildren: () => import('./core/main/main.module').then(m => m.MainModule),
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  }
]

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    StatementComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatIconModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
