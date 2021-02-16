import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {RestApiService} from '../../service/rest-api.service';
import {Router} from '@angular/router';
import Swal from "sweetalert2";


@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css']
})
export class CreateMeetingComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private  restAPIService:RestApiService,
              private router: Router,) { }


    meetingCreateForm: FormGroup;
    loading = false;
    submitted = false;
    dataSet;


  ngOnInit(): void {
      this.meetingCreateForm = this.formBuilder.group({
          topic: ['', [Validators.required,  Validators.pattern('^[a-zA-Z0-9 .]{5,40}$')]],
          meetingPassword: ['12345' , [Validators.required,  Validators.pattern('^[a-zA-Z0-9 .!@#$%_]{5,10}$')]],
          startTime: [new Date('dd-MM-yyyy hh:ii')],
          duration: ['25'],
          meeting_type:[1]
      });
  }
    // convenience getter for easy access to form fields
    get f(): any { return this.meetingCreateForm.controls; }


    onSubmit(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.meetingCreateForm.invalid) {
            return;
        }

        this.loading = true;
        this.dataSet={
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
        this.restAPIService.createMeeting( this.dataSet )
            .pipe(first())
            .subscribe(
                data => {
                    Swal.fire('Success!','Zoom Meeting created Successfully.','success');
                    this.router.navigate(['/']);
                },
                error => {
                    this.loading = false;
                  console.log(error)
                });
    }



}
