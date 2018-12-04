import { Component, Input, OnInit } from '@angular/core';
import { ContentGroup } from '../../../models/content-group';
import { ContentService } from '../../../services/http/content.service';
import { Content } from '../../../models/content';
import { ContentType } from '../../../models/content-type.enum';
import { AnswerOption } from '../../../models/answer-option';
import { ContentChoice } from '../../../models/content-choice';
import { Combination } from '../../../models/round-statistics';

export class ContentPercents {
  content: Content;
  percent: number;
  constructor(content: Content, percent: number) {
    this.content = content;
    this.percent = percent;
  }
}
@Component({
  selector: 'app-list-statistic',
  templateUrl: './list-statistic.component.html',
  styleUrls: ['./list-statistic.component.scss']
})

export class ListStatisticComponent implements OnInit {

  @Input() contentGroup: ContentGroup;
  contents: Content[] = [];
  displayedColumns = ['content', 'percentage'];
  statusGood = 85;
  statusOkay = 50;
  statusEmpty = -1;
  statusZero = 0;
  dataSource: ContentPercents[];
  total = 0;
  totalP = 0;
  contentCounter = 0;

  constructor(private contentService: ContentService) {
  }

  ngOnInit() {
    this.contentService.getContentChoiceByIds(this.contentGroup.contentIds).subscribe(contents => {
      this.getData(contents);
    });
  }

  getData(contents: ContentChoice[]) {
    this.contents = contents;
    const length = contents.length;
    let percent;
    this.dataSource = new Array<ContentPercents>(length);
    for (let i = 0; i < length; i++) {
      this.dataSource[i] = new ContentPercents(null, 0 );
      this.dataSource[i].content = this.contents[i];
      if (contents[i].format === ContentType.CHOICE) {
        this.contentService.getAnswer(contents[i].id).subscribe(answer => {
          if (contents[i].multiple) {
            percent = this.evaluateMultiple(contents[i].options, answer.roundStatistics[0].combinatedCounts);
          } else {
            percent = this.evaluateSingle(contents[i].options, answer.roundStatistics[0].independentCounts);
          }
          this.dataSource[i].percent = percent;
          if (percent >= 0) {
            console.log(percent);
            this.totalP += percent;
            this.total = this.totalP / this.contentCounter;
          } else {
            this.total = -1;
          }
        });
      } else {
        this.dataSource[i].percent = -1;
      }
    }
  }

  evaluateSingle(options: AnswerOption[], indCounts: number[]): number {
    let correctCounts = 0;
    let totalCounts = 0;
    const length = options.length;
    let correctIndex = new Array<number>();
    let res: number;
      for (let i = 0; i < length; i++) {
        if (options[i].points > 0) {
          correctIndex[0] = i;
        }
      }
      for (let i = 0; i < length; i++) {
        if (correctIndex.includes(i)) {
          correctCounts += indCounts[i];
        }
        totalCounts += indCounts[i];
      }
    if (totalCounts) {
      res = ((correctCounts / totalCounts) * 100);
      this.contentCounter++;
    } else {
      res = -1;
    }
    return res;
  }
}
