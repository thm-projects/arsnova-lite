import { Component, Inject, OnInit } from '@angular/core';
import { Comment } from '../../../../models/comment';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { RoomCreatorPageComponent } from '../../room-creator-page/room-creator-page.component';
import { NotificationService } from '../../../../services/util/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { RoomService } from '../../../../services/http/room.service';
import { Router } from '@angular/router';
import { CommentService } from '../../../../services/http/comment.service';
import { EventService } from '../../../../services/util/event.service';
import { DeleteCommentComponent } from '../delete-comment/delete-comment.component';
import { CommentExportComponent } from '../comment-export/comment-export.component';

@Component({
  selector: 'app-comment-settings',
  templateUrl: './comment-settings.component.html',
  styleUrls: ['./comment-settings.component.scss']
})
export class CommentSettingsComponent implements OnInit {

  roomId: string;
  comments: Comment[];
  commentThreshold: number;

  constructor(public dialogRef: MatDialogRef<RoomCreatorPageComponent>,
              public dialog: MatDialog,
              public notificationService: NotificationService,
              public translationService: TranslateService,
              protected roomService: RoomService,
              public router: Router,
              public commentService: CommentService,
              public eventService: EventService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  onSliderChange(event: any) {
    if (event.value) {
      this.commentThreshold = event.value;
    } else {
      this.commentThreshold = 0;
    }
  }


  openDeleteCommentDialog(): void {
    const dialogRef = this.dialog.open(DeleteCommentComponent, {
      width: '400px'
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === 'delete') {
          this.deleteComments();
        }
      });
  }

  deleteComments(): void {
    this.translationService.get('room-page.comments-deleted').subscribe(msg => {
      this.notificationService.show(msg);
    });
    this.commentService.deleteCommentsByRoomId(this.roomId).subscribe();
  }

  exportCsv(delimiter: string, date: string): void {
    this.commentService.getComments(this.roomId)
      .subscribe(comments => {
        this.comments = comments;
        const exportComments = JSON.parse(JSON.stringify(this.comments));
        let csv: string;
        let keyFields = '';
        let valueFields = '';
        keyFields = Object.keys(exportComments[0]).slice(3).join(delimiter) + '\r\n';
        exportComments.forEach(element => {
          element.body = '"' + element.body.replace(/[\r\n]/g, ' ').replace(/ +/g, ' ').replace(/"/g, '""') + '"';
          valueFields += Object.values(element).slice(3).join(delimiter) + '\r\n';
        });
        csv = keyFields + valueFields;
        const myBlob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        const fileName = 'comments_' + date + '.csv';
        link.setAttribute('download', fileName);
        link.href = window.URL.createObjectURL(myBlob);
        link.click();
      });
  }

  onExport(exportType: string): void {
    const date = new Date();
    const dateString = date.getFullYear() + '_' + ('0' + (date.getMonth() + 1)).slice(-2) + '_' + ('0' + date.getDate()).slice(-2);
    const timeString = ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2);
    const timestamp = dateString + '_' + timeString;
    if (exportType === 'comma') {
      this.exportCsv(',', timestamp);
    } else if (exportType === 'semicolon') {
      this.exportCsv(';', timestamp);
    }
  }

  openExportDialog(): void {
    const dialogRef = this.dialog.open(CommentExportComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.onExport(result);
    });
  }
}