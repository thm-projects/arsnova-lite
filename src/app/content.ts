import { ContentType } from './content-type';

export class Content {
  id: string;
  revision: string;
  roomId: string;
  subject: string;
  body: string;
  round: number;
  format: ContentType;
  formatAttributes: Map<string, string>;
  type: string;

  constructor(contentId: string,
              revision: string,
              roomId: string,
              subject: string,
              body: string,
              round: number,
              format: ContentType,
              formatAttributes: Map<string, string>,
              type: string) {
    this.id = contentId;
    this.revision = revision;
    this.roomId = roomId;
    this.subject = subject;
    this.body = body;
    this.round = round;
    this.format = format;
    this.formatAttributes = formatAttributes;
    this.type = type;
  }
}
