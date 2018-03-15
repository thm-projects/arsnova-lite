import { Injectable } from '@angular/core';
import { Content } from './content';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handling.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ContentService extends ErrorHandlingService {
  private apiBaseUrl = 'https://arsnova-staging.mni.thm.de/api';

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
    return this.http.post<Content>(this.contentUrl, content, httpOptions).pipe(
      catchError(this.handleError<Content>('addContent'))
    );
  }

  getContent(contentId: string): Observable<Content> {
    const url = `${this.contentUrl}/?contentId=${contentId}`;
    return this.http.get<Content>(url).pipe(
      catchError(this.handleError<Content>(`getContent id=${contentId}`))
    );
  }
}
