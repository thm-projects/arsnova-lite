import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Comment } from '../../../models/comment';
import { CommentService } from '../../../services/http/comment.service';
import { RoomService } from '../../../services/http/room.service';
import { NotificationService } from '../../../services/util/notification.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  comments: Comment[];
  isLoading = true;

  constructor( private route: ActivatedRoute,
              private roomService: RoomService,
              private location: Location,
              private commentService: CommentService,
              private notification: NotificationService ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getRoom(params['roomId']);
    });
  }

  getRoom(id: string): void {
    this.roomService.getRoom(id).subscribe(
      params => {
        this.getComments(params['id']);
      });
  }

  getComments(roomId: string): void {
    this.commentService.getComments(roomId)
      .subscribe(comments => {
        this.comments = comments;
        this.isLoading = false;
      });
  }

  setRead(comment: Comment): void {
    this.comments.find(c => c.id === comment.id).read = !comment.read;
    this.commentService.updateComment(comment).subscribe();
  }

  delete(comment: Comment): void {
    this.comments = this.comments.filter(c => c !== comment);
    this.commentService.deleteComment(comment).subscribe(room => {
      this.notification.show(`Comment '${comment.subject}' successfully deleted.`);
    });
  }
}
