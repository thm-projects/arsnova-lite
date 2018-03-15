import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { UserRole } from '../user-roles.enum';
import { ClientAuthentication } from '../client-authentication';
import { User } from '../user';

export class LoginErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Make UserRole available to the template
  UserRole = UserRole;

  @Input() public role: UserRole;

  usernameFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  matcher = new LoginErrorStateMatcher();

  constructor(public authenticationService: AuthenticationService,
              public router: Router,
              public notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  login(username: string, password: string): void {
    username = username.trim();
    password = password.trim();

    if (!this.usernameFormControl.hasError('required') && !this.usernameFormControl.hasError('email') &&
      !this.passwordFormControl.hasError('required')) {
      this.authenticationService.login(username, password).subscribe(loginSuccessful => this.checkLogin(loginSuccessful));
    } else {
      this.notificationService.show('Please fit the requirements shown above.');
    }
  }

  guestLogin(): void {
    this.authenticationService.guestLogin().subscribe(loginSuccessful => this.checkLogin(loginSuccessful));
  }

  private checkLogin(loginSuccessful: ClientAuthentication) {
    if (loginSuccessful) {
      const user: User = new User(
        loginSuccessful.userId,
        loginSuccessful.loginId,
        loginSuccessful.authProvider,
        loginSuccessful.token,
        this.role);
      this.authenticationService.setUser(user);
      this.notificationService.show('Login successful!');
      if (this.role === UserRole.CREATOR) {
        this.router.navigate(['creator']);
      } else {
        this.router.navigate(['participant']);
      }
    } else {
      this.notificationService.show('Username or password incorrect.');
    }
  }

}
