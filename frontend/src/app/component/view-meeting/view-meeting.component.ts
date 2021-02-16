import { Component, OnInit } from '@angular/core';

import { ActivatedRoute} from '@angular/router';
import {RestApiService} from '../../service/rest-api.service';
import {Subject} from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-meeting',
  templateUrl: './view-meeting.component.html',
  styleUrls: ['./view-meeting.component.css']
})
export class ViewMeetingComponent implements OnInit {

  constructor(private  restAPIService:RestApiService,private activatedRoute: ActivatedRoute) { }
    meeting = [];
    loadingImg=false;
    id='';
    destroy$: Subject<boolean> = new Subject<boolean>();


    ngOnInit(): void {
        if (typeof this.activatedRoute.snapshot.params.id !== 'undefined') {
            this.id = this.activatedRoute.snapshot.params.id;
        } else {
            this.id = '';
        }

        // fetching meeting details
        if(this.id)
        {
            this.fetchMeetingDetails()
        }
    }

   fetchMeetingDetails(){
       this.loadingImg =true;
       this.restAPIService.fetchMeetingDetails(this.id).subscribe((data: any[])=>{
            console.log(data);
           this.loadingImg =false;
           this.meeting = data;
       })
   }
}
