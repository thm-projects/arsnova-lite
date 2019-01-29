import { Component, OnInit } from '@angular/core';
import { Room } from '../../../models/room';
import { RoomService } from '../../../services/http/room.service';
import { AuthenticationService } from '../../../services/http/authentication.service';
import { UserRole } from '../../../models/user-roles.enum';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  rooms: Room[];
  closedRooms: Room[];
  baseUrl: string;
  isLoading = true;

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
      this.roomService.getCreatorRooms().subscribe(rooms => this.updateRoomList(rooms));
    } else if (this.authenticationService.getRole() === UserRole.PARTICIPANT) {
      this.roomService.getParticipantRooms().subscribe(rooms => this.updateRoomList(rooms));
    }
  }

  updateRoomList(rooms: Room[]) {
    this.rooms = rooms;
    this.closedRooms = this.rooms.filter(room => room.closed);
    this.isLoading = false;
  }
}