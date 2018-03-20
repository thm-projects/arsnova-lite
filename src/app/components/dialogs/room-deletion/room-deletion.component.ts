import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from '../../../services/util/notification.service';
import { RoomCreationComponent } from '../room-create/room-create.component';
import { RoomService } from '../../../services/http/room.service';
import { Room } from '../../../models/room';

@Component({
  selector: 'app-room-deletion',
  templateUrl: './room-deletion.component.html',
  styleUrls: ['./room-deletion.component.scss']
})
export class RoomDeletionComponent implements OnInit {
  room: Room;

  constructor(private roomService: RoomService,
              private router: Router,
              private notification: NotificationService,
              public dialogRef: MatDialogRef<RoomCreationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
