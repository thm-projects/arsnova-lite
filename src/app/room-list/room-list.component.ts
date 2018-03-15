import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { RoomService } from '../room.service';
import { AuthenticationService } from '../authentication.service';
import { UserRole } from '../user-roles.enum';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  rooms: Room[];
  closedRooms: Room[];
  baseUrl: string;

  constructor(
    private roomService: RoomService,
    protected authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.getRooms();
    this.getPath();
  }

  getPath() {
    if (this.authenticationService.getRole() === UserRole.CREATOR) {
      this.baseUrl = 'creator';
    } else {
      this.baseUrl = 'participant';
    }
  }

  getRooms(): void {
    if (this.authenticationService.getRole() === UserRole.CREATOR) {
      this.roomService.getCreatorRooms().subscribe(rooms => {
        this.rooms = rooms;
        this.closedRooms = this.rooms.filter(room => room.closed);
      });
    } else {
      this.roomService.getParticipantRooms().subscribe(rooms => {
        this.rooms = rooms;
        this.closedRooms = this.rooms.filter(room => room.closed);
      });
    }
  }
}
