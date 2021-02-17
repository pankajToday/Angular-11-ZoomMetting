import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CommonModule} from '@angular/common';

// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';
// Routing module for router service

import { AppRoutingModule } from './app-routing/app-routing.module';

// Forms module
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

// component
import { CreateMeetingComponent } from './component/create-meeting/create-meeting.component';
import { AllMeetingComponent } from './component/all-meeting/all-meeting.component';
import { Error404Component } from './component/error/error404/error404.component';
import { ViewMeetingComponent } from './component/view-meeting/view-meeting.component';
import { EditMeetingComponent } from './component/edit-meeting/edit-meeting.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateMeetingComponent,
    AllMeetingComponent,
    Error404Component,
    ViewMeetingComponent,
    EditMeetingComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
