import { CorrectWrong } from './correct-wrong.enum';

export class Comment {
  id: string;
  roomId: string;
  userId: string;
  revision: string;
  body: string;
  read: boolean;
  correct: CorrectWrong;
  favorite: boolean;
  timestamp: Date;
  score: number;
  createdFromLecturer: boolean;
  highlighted: boolean;
  ack: boolean;

  constructor(roomId: string = '',
              userId: string = '',
              body: string = '',
              read: boolean = false,
              correct: CorrectWrong = CorrectWrong.NULL,
              favorite: boolean = false,
              creationTimestamp: Date = null,
              score: number = 0,
              createdFromLecturer = false,
              highlighted: boolean = false,
              ack: boolean = true) {
    this.id = '';
    this.roomId = roomId;
    this.userId = userId;
    this.revision = '';
    this.body = body;
    this.read = read;
    this.correct = correct;
    this.favorite = favorite;
    this.timestamp = creationTimestamp;
    this.score = score;
    this.createdFromLecturer = createdFromLecturer;
    this.highlighted = highlighted;
    this.ack = ack;
  }
}
