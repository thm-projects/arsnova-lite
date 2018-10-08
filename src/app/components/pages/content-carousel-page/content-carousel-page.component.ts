import { Component, OnInit } from '@angular/core';
import { ContentType } from '../../../models/content-type.enum';
import { AnswerOption } from '../../../models/answer-option';
import { ContentChoice } from '../../../models/content-choice';
import { ContentText } from '../../../models/content-text';
import { ContentService } from '../../../services/http/content.service';
import { ActivatedRoute } from '@angular/router';
import { Content } from '../../../models/content';

@Component({
  selector: 'app-content-carousel-page',
  templateUrl: './content-carousel-page.component.html',
  styleUrls: ['./content-carousel-page.component.scss']
})
export class ContentCarouselPageComponent implements OnInit {
  ContentType: typeof ContentType = ContentType;

  contents: Content[];

  constructor(private contentService: ContentService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contentService.getContents(params['roomId']).subscribe(result => {
              this.contents = result;
      });
    });
  }
}
