import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Room } from '../../../models/room';
import { Comment } from '../../../models/comment';
import { RoomService } from '../../../services/http/room.service';
import { CommentService } from '../../../services/http/comment.service';
import { NotificationService } from '../../../services/util/notification.service';

@Component({
  selector: 'app-comment-create-page',
  templateUrl: './comment-create-page.component.html',
  styleUrls: ['./comment-create-page.component.scss']
})
export class CommentCreatePageComponent implements OnInit {
  @Input() room: Room;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private commentService: CommentService,
    private location: Location,
    private notification: NotificationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getRoom(params['roomId']);
    });
  }

  getRoom(id: string): void {
    this.roomService.getRoom(id).subscribe(room => this.room = room);
  }

  send(subject: string, body: string): void {
    subject = subject.trim();
    body = body.trim();
    if (!subject || !body) {
      return;
    }
    this.commentService.addComment({
      roomId: this.room.id,
      subject: subject,
      body: body,
      creationTimestamp: new Date(Date.now())
    } as Comment).subscribe(() => {
      this.notification.show(`Comment '${subject}' successfully created.`);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
