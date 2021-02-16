import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {RestApiService} from '../../service/rest-api.service';
import {Router,ActivatedRoute} from '@angular/router';
import Swal from "sweetalert2";
import {Subject} from 'rxjs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.css']
})
export class EditMeetingComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private  restAPIService:RestApiService,
              private router: Router,private activatedRoute: ActivatedRoute) { }

  meetingUpdateForm: FormGroup;
  loadingImg = false;
  submitted = false;
  dataSet;  // response set for send into rest-api
  meeting;  // for get data form rest API
  dateSendingToServer;
  id='';

    destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {

      if (typeof this.activatedRoute.snapshot.params.id !== 'undefined') {
          this.id = this.activatedRoute.snapshot.params.id;
      } else {
          this.id = '';
      }

      if(this.id)
      {
          this.fetchMeetingDetails()
      }

      this.meetingUpdateForm = this.formBuilder.group({
          topic: ['', [Validators.required,  Validators.pattern('^[a-zA-Z0-9 .]{5,40}$')]],
          meetingPassword: ['' , [Validators.required,  Validators.pattern('^[a-zA-Z0-9 .!@#$%_]{5,10}$')]],
          startTime: [],
          duration: [],
          id:[],
          meeting_type:[1]
      });
  }

    // convenience getter for easy access to form fields
    get f(): any { return this.meetingUpdateForm.controls; }

    setData()
    {
        this.meetingUpdateForm = this.formBuilder.group({
            topic: [this.meeting.topic, [Validators.required,  Validators.pattern('^[a-zA-Z0-9 .]{5,40}$')]],
            meetingPassword: ['' , [Validators.required,  Validators.pattern('^[a-zA-Z0-9 .!@#$%_]{5,10}$')]],
            startTime: [this.dateSendingToServer],
            duration: [this.meeting.duration],
            id: [this.meeting.id],
            meeting_type:[this.meeting.type]
        });
    }

    // fetching meeting details
    fetchMeetingDetails(){
        this.loadingImg =true;
        this.restAPIService.fetchMeetingDetails(this.id).subscribe((data: any[])=>{
            this.loadingImg =false;
            this.meeting = data;
            this.dateSendingToServer = new DatePipe('en-US').transform(this.meeting.start_time, 'dd/MM/yyyy')
            this.setData()
        })
    }

    onSubmit(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.meetingUpdateForm.invalid) {
            return;
        }

        this.loadingImg = true;
        this.dataSet={
            "id":this.id,
            "topic": this.f.topic.value,
            "type": this.f.meeting_type.value,
            "start_time": this.f.startTime.value,
            "duration": this.f.duration.value,
            "password": this.f.meetingPassword.value,
            "timezone": "Asia/Kolkata",
            "agenda": "pankaj test",
            "settings": {
                "host_video": 1,
                "participant_video": 1,
                "in_meeting": 1,
                "join_before_host": 1,
                "mute_upon_entry": 1,
                "watermark": 1,
                "approval_type": 2,
                "audio": "voip"
            }
        };
        this.restAPIService.updateMeeting( this.dataSet )
            .pipe(first())
            .subscribe(
                data => {
                    Swal.fire('Success!','Zoom Meeting updated Successfully.','success');
                    this.loadingImg = false;
                    Swal.fire('Success!','Meeting updated Successfully','success')
                    this.router.navigate(['/']);
                },
                error => {
                    this.loadingImg = false;
                    Swal.fire('Error!','Something went wrong!','error');
                    console.log(error)
                });
    }
}
