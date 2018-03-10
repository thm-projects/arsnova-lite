import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { Location } from '@angular/common';
import { RoomService } from '../room.service';
import { ActivatedRoute } from '@angular/router';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-participant-room',
  templateUrl: './participant-room.component.html',
  styleUrls: ['./participant-room.component.scss']
})
export class ParticipantRoomComponent extends RoomComponent implements OnInit {

  room: Room;
  isLoading = true;

  constructor(protected location: Location,
              protected roomService: RoomService,
              protected route: ActivatedRoute) {
    super(roomService, route, location);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getRoom(params['roomId']);
    });
  }
}
