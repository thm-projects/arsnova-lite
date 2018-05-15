import { Component, Inject, OnInit } from '@angular/core';
import { DisplayAnswer } from '../content-choice-creator/content-choice-creator.component';
import { ContentChoice } from '../../../models/content-choice';
import { AnswerOption } from '../../../models/answer-option';
import { ContentType } from '../../../models/content-type.enum';
import { ContentService } from '../../../services/http/content.service';
import { NotificationService } from '../../../services/util/notification.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ContentListComponent } from '../content-list/content-list.component';
import { ContentDeleteComponent } from '../../dialogs/content-delete/content-delete.component';

@Component({
  selector: 'app-content-likert-creator',
  templateUrl: './content-likert-creator.component.html',
  styleUrls: ['./content-likert-creator.component.scss']
})
export class ContentLikertCreatorComponent implements OnInit {
  likertScale = [
    'Strongly agree',
    'Agree',
    'Neither agree nor disagree',
    'Disagree',
    'Strongly disagree'
  ];

  content: ContentChoice = new ContentChoice('0',
    '1',
    '',
    '',
    '',
    1,
    [],
    [],
    false,
    ContentType.SCALE);

  displayedColumns = ['label'];

  displayAnswers: DisplayAnswer[] = [];
  newAnswerOptionPoints = '0';

  editDialogMode = false;

  constructor(private contentService: ContentService,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<ContentListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  fillCorrectAnswers() {
    this.displayAnswers = [];
    for (let i = 0; i < this.content.options.length; i++) {
      this.content.correctOptionIndexes.push(i);
      this.displayAnswers.push(new DisplayAnswer(this.content.options[i], this.content.correctOptionIndexes.includes(i)));
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.content.roomId = params['roomId'];
    });
    for (let i = 0; i < this.likertScale.length; i++) {
      this.content.options.push(new AnswerOption(this.likertScale[i], this.newAnswerOptionPoints));
    }
    this.fillCorrectAnswers();
  }

  resetAfterSubmit() {
    this.content.subject = '';
    this.content.body = '';
    this.content.correctOptionIndexes = [];
    this.fillCorrectAnswers();
    this.notificationService.show('Content submitted. Ready for creation of new content.');
  }

  submitContent(): void {
    if (this.content.body.valueOf() === '' || this.content.body.valueOf() === '') {
      this.notificationService.show('No empty fields allowed. Please check subject and body.');
      return;
    }
    this.notificationService.show('Content sumbitted.');
    // ToDo: Check api call
    // this.contentService.addContent(this.content);
    // For Testing:
    // console.log(this.content);
    this.resetAfterSubmit();
  }

  editDialogClose($event, action: string) {
    $event.preventDefault();
    this.dialogRef.close(action);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDeletionContentDialog($event): void {
    $event.preventDefault();
    const dialogRef = this.dialog.open(ContentDeleteComponent, {
      width: '400px'
    });
    dialogRef.componentInstance.content = this.content;
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === 'delete') {
          this.dialogRef.close(result);
        }
      });
  }
}