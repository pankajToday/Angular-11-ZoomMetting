import { Component } from '@angular/core';

import { FireBaseServiceService } from "./service/fire-base-service.service";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zoom-Meeting';
    message;
    constructor(private messagingService: FireBaseServiceService) { }

    ngOnInit() {this.messagingService.requestPermission()
        this.messagingService.receiveMessage()
        this.message = this.messagingService.currentMessage}
}
