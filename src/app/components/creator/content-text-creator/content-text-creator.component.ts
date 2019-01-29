import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ContentText } from '../../../models/content-text';
import { ContentService } from '../../../services/http/content.service';
import { NotificationService } from '../../../services/util/notification.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ContentListComponent } from '../content-list/content-list.component';
import { ContentDeleteComponent } from '../_dialogs/content-delete/content-delete.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-content-text-creator',
  templateUrl: './content-text-creator.component.html',
  styleUrls: ['./content-text-creator.component.scss']
})
export class ContentTextCreatorComponent implements OnInit {
  @Input() contentSub;
  @Input() contentBod;
  @Input() contentCol;
  @Output() reset = new EventEmitter<boolean>();

  roomId: string;
  content: ContentText = new ContentText(
    '1',
    '1',
    '0',
    '',
    '',
    1,
    [],
  );

  editDialogMode = false;

  constructor(private contentService: ContentService,
              private notificationService: NotificationService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<ContentListComponent>,
              private translationService: TranslateService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.roomId = localStorage.getItem(`roomId`);
  }

  resetAfterSubmit() {
    this.reset.emit(true);
    this.translationService.get('content.submitted').subscribe(message => {
      this.notificationService.show(message);
    });
  }

  submitContent() {
    let contentGroup: string;
    if (this.contentCol === 'Default') {
      contentGroup = '';
    } else {
      contentGroup = this.contentCol;
    }
    this.contentService.addContent(new ContentText(
      null,
      null,
      this.roomId,
      this.contentSub,
      this.contentBod,
      1,
      [contentGroup],
    )).subscribe();
    if (this.contentSub === '' || this.contentBod === '') {
      this.translationService.get('content.no-empty').subscribe(message => {
        this.notificationService.show(message);
      });
      return;
    }
    sessionStorage.setItem('collection', this.contentCol);
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