import { Component, OnInit } from '@angular/core';
import { RoomCreateComponent } from '../../shared/_dialogs/room-create/room-create.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../services/util/language.service';
import { AuthenticationService } from '../../../services/http/authentication.service';
import { User } from '../../../models/user';
import { LoginComponent } from '../login/login.component';
import { UserRole } from '../../../models/user-roles.enum';

@Component({
  selector: 'app-new-landing',
  templateUrl: './new-landing.component.html',
  styleUrls: ['./new-landing.component.scss']
})
export class NewLandingComponent implements OnInit {

  user: User;

  constructor(private router: Router,
              public dialog: MatDialog,
              private translateService: TranslateService,
              protected langService: LanguageService,
              public authenticationService: AuthenticationService) {
    langService.langEmitter.subscribe(lang => translateService.use(lang));
  }

  ngOnInit() {
    this.translateService.use(localStorage.getItem('currentLang'));
    this.authenticationService.watchUser.subscribe(newUser => this.user = newUser);
  }

  createSession() {
    if (!this.user  || this.user.isGuest) {
      this.openLoginDialog();
    } else {
      this.openCreateRoomDialog();
    }
  }

  openCreateRoomDialog(): void {
    this.dialog.open(RoomCreateComponent, {
      width: '350px'
    });
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px'
    });
    dialogRef.componentInstance.role = UserRole.CREATOR;
    dialogRef.componentInstance.loginType = 'beforecreation';
    dialogRef.afterClosed()
      .subscribe(result => {
          if (this.user && !this.user.isGuest) {
            this.openCreateRoomDialog();
          }
      });
  }
}
