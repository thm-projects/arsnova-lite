import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { Comment } from '../../models/comment';
import { AuthenticationService } from './authentication.service';
import { BaseHttpService } from './base-http.service';

const httpOptions = {
  headers: new HttpHeaders({})
};

@Injectable()
export class CommentService extends BaseHttpService {
  private apiBaseUrl = 'https://arsnova-staging.mni.thm.de/api';
  private commentsUrl = '/comment';
  private findCommentUrl = '/find';

  constructor( private http: HttpClient,
               private authService: AuthenticationService ) {
    super();
  }

  addComment(comment: Comment): Observable<Comment> {
    const url = this.apiBaseUrl + this.commentsUrl + '/';
    return this.http.post<Comment>(url, {
      roomId: comment.roomId, subject: comment.subject, body: comment.body, read: false, creationTimestamp: this.getDate()
    }, httpOptions).pipe(
      tap (_ => ''),
      catchError(this.handleError<Comment>('addComment'))
    );
  }

  getComment(id: string): Observable<Comment> {
    const url = `${this.apiBaseUrl}${this.commentsUrl}/${id}` + '/';
    return this.http.get<Comment>(url).pipe(
      catchError(this.handleError<Comment>(`getComment id=${id}`))
    );
  }

  getComments(roomId: string): Observable<Comment[]> {
    const url = this.apiBaseUrl + this.commentsUrl + this.findCommentUrl + '/';
    return this.http.post<Comment[]>( url, {
      properties: { roomId: roomId },
      externalFilters: {}
    }).pipe(
      tap (_ => ''),
      catchError(this.handleError<Comment[]>('getComments', []))
    );
  }

  updateComment(comment: Comment): Observable<any> {
    const url = `${this.apiBaseUrl}${this.commentsUrl}/${comment.id} + '/'`;
    return this.http.put(url, {
      ownerId: this.authService.getUser().id,
      roomId: comment.roomId, subject: comment.subject, body: comment.body, read: !comment.read,
    }, httpOptions).pipe(
      tap(_ => ''),
      catchError(this.handleError<any>('updateComment'))
    );
  }

  deleteComment(comment: Comment): Observable<Comment> {
    const url = `${this.apiBaseUrl}${this.commentsUrl}/${comment.id}` + '/';
    return this.http.delete<Comment>(url, httpOptions).pipe(
      tap (_ => ''),
      catchError(this.handleError<Comment>('deleteComment'))
    );
  }

  private getDate(): any {
    const date = new Date(Date.now());
    return date.getTime();
  }
}
