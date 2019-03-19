import { Component, Inject, OnInit } from '@angular/core';
import { Comment } from '../../../../models/comment';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../services/util/notification.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { CommentPageComponent } from '../../comment-page/comment-page.component';
import { AuthenticationService } from '../../../../services/http/authentication.service';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-submit-comment',
  templateUrl: './submit-comment.component.html',
  styleUrls: ['./submit-comment.component.scss']
})
export class SubmitCommentComponent implements OnInit {

  comment: Comment;
  subjectForm = new FormControl('', [Validators.required]);
  bodyForm = new FormControl('', [Validators.required]);

  constructor(private router: Router,
              private notification: NotificationService,
              public dialogRef: MatDialogRef<CommentPageComponent>,
              private translateService: TranslateService,
              protected authenticationService: AuthenticationService,
              public dialog: MatDialog,
              private translationService: TranslateService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.translateService.use(localStorage.getItem('currentLang'));
  }

  onNoClick(): void {
    this.dialogRef.close('abort');
  }

  checkInputData(subject: string, body: string): boolean {
    subject = subject.trim();
    body = body.trim();
    if (!subject && !body) {
      this.translationService.get('comment-page.error-both-fields').subscribe(message => {
        this.notification.show(message);
      });
      return false;
    }
    if (!subject) {
      this.translationService.get('comment-page.error-title').subscribe(message => {
        this.notification.show(message);
      });
      return false;
    }
    if (!body) {
      this.translationService.get('comment-page.error-comment').subscribe(message => {
        this.notification.show(message);
      });
      return false;
    }
    return true;
  }

  closeDialog(subject: string, body: string) {
    const comment = new Comment();
    this.checkInputData(comment.b)
    this.dialogRef.close(comment);
  }
}
