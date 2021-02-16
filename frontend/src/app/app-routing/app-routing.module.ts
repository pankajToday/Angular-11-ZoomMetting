import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';



import {AllMeetingComponent} from '../component/all-meeting/all-meeting.component';
import {Error404Component} from '../component/error/error404/error404.component';
import {CreateMeetingComponent} from '../component/create-meeting/create-meeting.component';
import {ViewMeetingComponent} from '../component/view-meeting/view-meeting.component';
import {EditMeetingComponent} from '../component/edit-meeting/edit-meeting.component';

const routes: Routes = [
    { path: 'error-400' , component:Error404Component },
    { path: 'all-meeting-list', component: AllMeetingComponent },
    { path: 'create-meeting', component: CreateMeetingComponent },
    { path: 'view-meeting/:id', component: ViewMeetingComponent },
    { path: 'edit-meeting/:id', component: EditMeetingComponent },
    { path: 'delete-meeting/:id', component: AllMeetingComponent },
    { path: '', pathMatch: 'full', redirectTo: 'all-meeting-list' },
    { path: '**', component:Error404Component },
];


// @ts-ignore
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
    exports: [RouterModule]
})



export class AppRoutingModule { }
