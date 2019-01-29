import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../services/http/content.service';
import { ContentChoice } from '../../../models/content-choice';

export class AnswerList {
  label: string;
  answer: string;

  constructor(label: string, answer: string) {
    this.label = label;
    this.answer = answer;
  }
}

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  chart = [];
  colors: string[] = ['rgba(33,150,243, 0.8)', 'rgba(76,175,80, 0.8)', 'rgba(255,235,59, 0.8)', 'rgba(244,67,54, 0.8)',
                      'rgba(96,125,139, 0.8)', 'rgba(63,81,181, 0.8)', 'rgba(233,30,99, 0.8)', 'rgba(121,85,72, 0.8)'];
  label = 'ABCDEFGH';
  labels: string[]; // = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  answers: string[];
  answerList: AnswerList[];
  data: number[];
  contentId: string;
  subject: string;
  maxLength: number;
  isLoading = true;

  constructor(protected route: ActivatedRoute,
              private contentService: ContentService) { }

  ngOnInit() {
    this.maxLength = innerWidth / 12;
    this.answers = new Array<string>();
    this.labels = new Array<string>();
    this.answerList = new Array<AnswerList>();
    this.data = new Array<number>();
    this.route.params.subscribe(params => {
      this.contentId = params['contentId'];
    });
    this.contentService.getChoiceContent(this.contentId).subscribe(content => {
      this.getData(content);
      this.isLoading = false;
    });
  }

  getData(content: ContentChoice) {
    this.subject = content.subject;
    const length = content.options.length;
    for (let i = 0; i < length; i++) {
      this.answerList[i] = new AnswerList(null, null);
      this.labels[i] = this.label.charAt(i);
      this.answerList[i].label = this.labels[i];
      if (content.options[i].label.length > this.maxLength) {
        this.answerList[i].answer = content.options[i].label.substr(0, this.maxLength) + '..';
      } else {
        this.answerList[i].answer = content.options[i].label;
      }
    }
    this.contentService.getAnswer(content.id).subscribe(answer => {
      this.data = answer.roundStatistics[0].independentCounts;
      this.chart = new Chart('chart', {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [{
            data: this.data,
            backgroundColor: this.colors
          }]
        },
        options: {
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                precision: 0
              }
            }]
          }
        }
      });
    });
  }
}