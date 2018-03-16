import { Injectable } from '@angular/core';
import { Content } from './content';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handling.service';

const httpOptions = {
  headers: new HttpHeaders({})
};

@Injectable()
export class ContentService extends ErrorHandlingService {
  private apiBaseUrl = 'https://arsnova-staging.mni.thm.de/api';
  private apiContentUrl = '/content/';
  private apiFindUrl = '/find';

  constructor(private http: HttpClient) {
    super();
  }

  getContents(roomId: string): Observable<Content[]> {
    const url = `${this.apiBaseUrl}/?roomId=${roomId}`;
    return this.http.get<Content[]>(url).pipe(
      catchError(this.handleError('getContents', []))
    );
  }

  addContent(content: Content): Observable<Content> {
    const connectionurl = this.apiBaseUrl + this.apiContentUrl;
    return this.http.post<Content>(connectionurl, { content: content }, httpOptions).pipe(
      catchError(this.handleError<Content>('addContent'))
    );
  }

  getContent(contentId: string): Observable<Content> {
    const connectionurl = this.apiBaseUrl;
    const url = `${connectionurl}/?contentId=${contentId}`;
    return this.http.get<Content>(url).pipe(
      catchError(this.handleError<Content>(`getContent id=${contentId}`))
    );
  }
}
