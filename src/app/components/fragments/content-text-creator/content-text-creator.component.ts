import { Component, Inject, OnInit } from '@angular/core';
import { ContentText } from '../../../models/content-text';
import { ContentService } from '../../../services/http/content.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../services/util/notification.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ContentListComponent } from '../content-list/content-list.component';
import { ContentDeleteComponent } from '../../dialogs/content-delete/content-delete.component';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { RoomService } from '../../../services/http/room.service';
import { Room } from '../../../models/room';

@Component({
  selector: 'app-content-text-creator',
  templateUrl: './content-text-creator.component.html',
  styleUrls: ['./content-text-creator.component.scss']
})
export class ContentTextCreatorComponent implements OnInit {

  roomId: string;
  roomShortId: string;
  room: Room;
  content: ContentText = new ContentText(
    '1',
    '1',
    '0',
    '',
    '',
    1,
    [],
  );
  collections: string[] = ['ARSnova', 'Angular', 'HTML', 'TypeScript' ];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  editDialogMode = false;

  constructor(private contentService: ContentService,
              private notificationService: NotificationService,
              private roomService: RoomService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<ContentListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.roomId = localStorage.getItem(`roomId`);
    this.roomShortId = this.route.snapshot.paramMap.get('roomId');
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.collections.filter(collection => collection.toLowerCase().includes(filterValue));
  }

  resetAfterSubmit() {
    this.content.subject = '';
    this.content.body = '';
    this.notificationService.show('Content submitted. Ready for creation of new content.');
  }

  submitContent(subject: string, body: string, group: string) {
    this.contentService.addContent(new ContentText(
      '1',
      '1',
      this.roomId,
      subject,
      body,
      1,
      [group],
    )).subscribe();
    if (this.content.body.valueOf() === '' || this.content.body.valueOf() === '') {
      this.notificationService.show('No empty fields allowed. Please check subject and body.');
      return;
    }
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
