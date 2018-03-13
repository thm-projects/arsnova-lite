import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { UserRole } from './user-roles.enum';
import { DataStoreService } from './data-store.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthProvider } from './auth-provider';
import { NotificationService } from './notification.service';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handling.service';
import { ClientAuthentication } from './client-authentication';

// TODO: connect to API
// TODO: persist user data (shouldn't get lost on page refresh)
@Injectable()
export class AuthenticationService {
  private readonly STORAGE_KEY: string = 'USER';
  private user: User;
  private apiBaseUrl = 'https://arsnova-staging.mni.thm.de/api';
  private apiAuthUrl = '/auth';
  private apiLoginUrl = '/login';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/vnd.de.thm.arsnova.v3+json',
      'charset': 'UTF-8'
    })
  };

  constructor(private dataStoreService: DataStoreService,
              private http: HttpClient) {
    if (dataStoreService.has(this.STORAGE_KEY)) {
      // Load user data from local data store if available
      this.user = JSON.parse(dataStoreService.get(this.STORAGE_KEY));
    }
  }

  login(email: string, password: string): Observable<ClientAuthentication> {
    // ToDo: Replace with actual ARSnova details
    return of({
      'userId': email,
      'loginId': email + password,
      'authProvider': AuthProvider.ARSNOVA,
      'token': password + email + password
    } as ClientAuthentication);
  }

  guestLogin(): Observable<ClientAuthentication> {
    const connectionUrl: string = this.apiBaseUrl + this.apiAuthUrl + this.apiLoginUrl + '/guest';

    return this.http.post<ClientAuthentication>(connectionUrl, null, this.httpOptions);
  }

  register(email: string, password: string): Observable<boolean> {
    return of(true);
  }

  resetPassword(email: string): Observable<boolean> {
    return of(true);
  }

  logout() {
    // Destroy the persisted user data
    this.dataStoreService.remove(this.STORAGE_KEY);
    this.user = undefined;
  }

  getUser(): User {
    return this.user;
  }

  setUser(user: User): void {
    this.user = user;
    this.dataStoreService.set(this.STORAGE_KEY, JSON.stringify(this.user));
  }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  getRole(): UserRole {
    return this.isLoggedIn() ? this.user.userRole : undefined;
  }

}
