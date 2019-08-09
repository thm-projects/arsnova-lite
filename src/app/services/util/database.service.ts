import { Injectable } from '@angular/core';
import  Dexie from 'dexie';
import { Comment } from '../../models/comment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie {

  comments: Dexie.Table<Comment, string>;

  constructor() {
    super('indexedDB');
    this.version(1).stores({
      comments: 'id, roomId, userId, revision, body, read, correct, favorite, timestamp, score' +
        'createdFromLecturer, highlighted, ack'
    });
  }
}
