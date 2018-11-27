import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/http/authentication.service';
import { UserRole } from '../../../models/user-roles.enum';
import { NotificationService } from '../../../services/util/notification.service';
import { RxStompService } from '@stomp/ng2-stompjs';

/* ToDo: Use TranslateService */

@Component({
  selector: 'app-feedback-barometer-page',
  templateUrl: './feedback-barometer-page.component.html',
  styleUrls: ['./feedback-barometer-page.component.scss']
})
export class FeedbackBarometerPageComponent implements OnInit {
  feedback: any = [
    { state: 0, name: 'sentiment_very_satisfied', message: 'I can follow you.', count: 0, },
    { state: 1, name: 'sentiment_satisfied', message: 'Faster, please!', count: 0, },
    { state: 2, name: 'sentiment_dissatisfied', message: 'Slower, please!', count: 0, },
    { state: 3, name: 'sentiment_very_dissatisfied', message: 'You\'ve lost me.', count: 0, },
  ];
  userRole: UserRole;
  roomId: number;
  feedBackUrl = '/Room/' + this.roomId;

  data = [2, 3, 2, 1]; // dummy data -> delete this with api implementation and add get-data

  constructor(
    private authenticationService: AuthenticationService,
    private notification: NotificationService,
    private rxStompService: RxStompService) {}

  ngOnInit() {
    this.userRole = this.authenticationService.getRole();
    this.rxStompService.watch(this.feedBackUrl).subscribe(message => {
      this.data = message.body; // Adjust to backend implementation
    });
    this.updateFeedback(this.data);
  }

  private updateFeedback(data) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = data.reduce(reducer);
    for (let i = 0; i < this.feedback.length; i++) {
      this.feedback[i].count = data[i] / sum * 100;
    }
  }

  submitFeedback(state: string) {
    this.rxStompService.publish({ destination: this.feedBackUrl, body: state });
    this.updateFeedback(this.data);
    this.notification.show(`Feedback submitted to room.`);
  }

  toggle() {
    // api feature is yet not implemented
    const temp = 'stopped'; // add status variable
    this.notification.show(`Feedback transmission ${ temp }.`);
  }
}
