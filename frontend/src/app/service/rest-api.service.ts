import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse ,HttpHeaders } from "@angular/common/http";

import {Observable, throwError} from 'rxjs';
import {retry, catchError, tap, first, map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class RestApiService {
    private ErrorEvent: any;

    constructor(private httpClient: HttpClient) { }

    // fetch all meeting list
    fetchAllMeetings(){
        let header = new HttpHeaders({'Content-Type': 'application/json'});
        const requestOptions = {  headers: header};
        //const options = { params: new HttpParams({fromString: "_page=1&_limit=20"}) };
        return this.httpClient.get( `${environment.APIURL}/api/zoom/all-meeting`,requestOptions).pipe(first(), catchError(this.handleError));
    }

    // fetch all meeting detail
    fetchMeetingDetails(id){
        let header = new HttpHeaders({ 'Content-Type': 'application/json'});
        const requestOptions = {  headers: header};

        return this.httpClient.get(`${environment.APIURL}/api/zoom/view-meeting/`+id,requestOptions).pipe(first(), catchError(this.handleError));
    }

    // create new meeting
    createMeeting(formData): Observable<any> {
        let header = new HttpHeaders({ 'Content-Type': 'application/json'});
        const requestOptions = {  headers: header};

        return this.httpClient.post<any>(`${environment.APIURL}/api/zoom/create-meeting/`, formData ,requestOptions)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                return user;
            }));
    }

    // create new meeting
    updateMeeting(formData): Observable<any> {
        let header = new HttpHeaders({ 'Content-Type': 'application/json' });
        const requestOptions = {  headers: header};

        return this.httpClient.post<any>(`${environment.APIURL}/api/zoom/update-meeting`, formData ,requestOptions)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                return user;
            }));
    }

    // delete meeting
    deleteMeeting(id)
    {
        let header = new HttpHeaders({ 'Content-Type': 'application/json'});
        const requestOptions = {  headers: header};
        return this.httpClient.post(`${environment.APIURL}/api/zoom/delete-meeting/`+id,'',requestOptions).pipe(first(), catchError(this.handleError));

    }


    // Handle Error
    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof this.ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(error);
        Swal.fire('Error!',errorMessage,'error')
        return throwError(errorMessage);
    }


}
