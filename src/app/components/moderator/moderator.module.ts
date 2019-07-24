import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeratorRoutingModule } from './moderator-routing.module';
import { RoomModeratorPageComponent } from './room-moderator-page/room-moderator-page.component';
import { EssentialsModule } from '../essentials/essentials.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  imports: [
    CommonModule,
    ModeratorRoutingModule,
    EssentialsModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  declarations: [
    RoomModeratorPageComponent
  ]
})
export class ModeratorModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/i18n/moderator/', '.json');
}
