import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../../service/rest-api.service';
import {Subject} from 'rxjs';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-meeting',
  templateUrl: './all-meeting.component.html',
  styleUrls: ['./all-meeting.component.css']
})
export class AllMeetingComponent implements OnInit {

  constructor(private  restAPIService:RestApiService,private router: Router) { }
    meetings = [];
    index=1;
    loadingImg=false;
    id='';

  ngOnInit(): void {
      this.fetchAllMeetings();
  }

  fetchAllMeetings()
  {

      this.loadingImg =true;
      this.restAPIService.fetchAllMeetings().subscribe((data: meetingsInterFace)=>{
          this.meetings = data.meetings;
          this.loadingImg = false;
      })
  }



  deleteMeeting(id){

      Swal.fire({
          title: 'Are you sure?',
          text: 'This process is irreversible.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes.',
          cancelButtonText: 'No'
      }).then((result) => {
          if (result.value) {

              this.loadingImg =true;
              this.restAPIService.deleteMeeting(id).subscribe((data:any)=>{
                  this.loadingImg = false;
                  this.router.navigate(['/all-meeting-list']);
                  Swal.fire(
                      'Removed!',
                      'Meeting removed successfully.',
                      'success'
                  );
              })
          }
      })
  }


}
export class meetingsInterFace {
    meetings: any[];
}

