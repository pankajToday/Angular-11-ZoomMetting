import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../../service/rest-api.service';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2'

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
    destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnInit(): void {

      this.fetchAllMeetings();
  }

  fetchAllMeetings()
  {
     this.loadingImg =true;
      this.restAPIService.fetchAllMeetings().subscribe((data: [])=>{
         // console.log(data.meetings);
          this.meetings = data;
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
              this.restAPIService.deleteMeeting(id).subscribe((data)=>{
                  this.loadingImg = false;
                  this.router.navigate(['/']);
                  Swal.fire(
                      'Removed!',
                      'Meeting removed successfully.',
                      'success'
                  );

              })
          }
      })
  }

    ngOnDestroy() {
        this.destroy$.next(true);
        // Unsubscribe from the subject
        this.destroy$.unsubscribe();
    }

}
