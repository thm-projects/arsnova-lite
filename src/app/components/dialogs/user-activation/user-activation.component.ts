import { Component, Inject, OnInit} from '@angular/core';
import { NotificationService } from '../../../services/util/notification.service';
import { UserService } from '../../../services/http/user.service';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrls: ['./user-activation.component.scss']
})
export class UserActivationComponent implements OnInit {

  activationKeyFormControl = new FormControl('', [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<UserActivationComponent>,
    private translationService: TranslateService
  ) {
  }

  ngOnInit() {
  }

  login(activationKey: string): void {
    activationKey = activationKey.trim();

    this.userService.activate(this.data.name.trim(), activationKey).subscribe(
      ret => {
        this.dialogRef.close({success: true});
      },
      err => {
        this.translationService.get('login.activation-key-incorrect').subscribe(message => {
          this.notificationService.show(message);
        });
      }
    );
  }
}
