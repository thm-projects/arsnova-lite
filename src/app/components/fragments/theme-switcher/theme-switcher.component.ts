import { Component, HostBinding, OnInit, Version } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {

  constructor(private http: HttpClient, public overlayContainer: OverlayContainer) {}

  title = 'app';
  version: Version;
  @HostBinding('class') componentCssClass;

  ngOnInit() {
    this.getVersion();
  }

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }

  getVersion() {
    this.http.get<Version>('/api/version')
      .subscribe(data => {
        this.version = data;
      });
  }

}
