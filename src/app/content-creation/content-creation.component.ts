import { Component, Inject, OnInit } from '@angular/core';
import { ContentService } from '../content.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { Content } from '../content';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RoomComponent } from '../room/room.component';
import { ContentType } from '../content-type';

@Component({
  selector: 'app-content-creation',
  templateUrl: './content-creation.component.html',
  styleUrls: ['./content-creation.component.scss']
})
export class ContentCreationComponent implements OnInit {
  subject: string;
  body: string;
  roomId: string;
  emptyInputs = false;
  public format = ContentType;

  constructor(private contentService: ContentService,
              private router: Router,
              private notification: NotificationService,
              public dialogRef: MatDialogRef<RoomComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  resetEmptyInputs(): void {
    this.emptyInputs = false;
  }

  addContent(subject: string, body: string) {
    subject = subject.trim();
    body = body.trim();
    if (!subject || !body) {
      this.emptyInputs = true;
      return;
    }
    this.contentService.addContent({
      roomId: this.roomId,
      subject: subject,
      body: body,
      type: 'Content',
      format: this.format.TEXT
    } as Content)
      .subscribe(content => {
        this.notification.show(`Content '${content.subject}' successfully created.`);
        this.router.navigate([`content/${content.id }`]);
        this.dialogRef.close();
      });
  }
}
