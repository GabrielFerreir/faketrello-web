import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { CoreService } from '../../Services/core.service';

@Component({
  selector: 'app-all-notification',
  templateUrl: './all-notification.component.html',
  styleUrls: ['./all-notification.component.css']
})
export class AllNotificationComponent implements OnInit {

  constructor(private notification: NotificationService,
              private  core: CoreService) { }

  ngOnInit() {
    this.notification.searchNotificationAll();
  }

}
