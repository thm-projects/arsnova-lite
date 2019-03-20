import { Component, Inject, OnInit } from '@angular/core';
import { Comment } from '../../../../models/comment';
import { NotificationService } from '../../../../services/util/notification.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { CommentPageComponent } from '../../comment-page/comment-page.component';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../../../models/user';


@Component({
  selector: 'app-submit-comment',
  templateUrl: './submit-comment.component.html',
  styleUrls: ['./submit-comment.component.scss']
})
export class SubmitCommentComponent implements OnInit {

  comment: Comment;

  user: User;
  roomId: string;

  subjectForm = new FormControl('', [Validators.required]);
  bodyForm = new FormControl('', [Validators.required]);
  private date = new Date(Date.now());

  constructor(
              private notification: NotificationService,
              public dialogRef: MatDialogRef<CommentPageComponent>,
              private translateService: TranslateService,
              public dialog: MatDialog,
              private translationService: TranslateService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.translateService.use(localStorage.getItem('currentLang'));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkInputData(body: string): boolean {
    body = body.trim();
    if (!body) {
      this.translationService.get('comment-page.error-comment').subscribe(message => {
        this.notification.show(message);
      });
      return false;
    }
    return true;
  }

  closeDialog(body: string) {
    if (this.checkInputData(body) === true) {
      const comment = new Comment();
      comment.roomId = localStorage.getItem(`roomId`);
      comment.body = body;
      comment.userId = this.user.id;
      this.dialogRef.close(comment);
    }
  }
}
