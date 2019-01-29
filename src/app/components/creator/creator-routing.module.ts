import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeCreatorPageComponent } from './home-creator-page/home-creator-page.component';
import { AuthenticationGuard } from '../../guards/authentication.guard';
import { UserRole } from '../../models/user-roles.enum';
import { RoomCreatorPageComponent } from './room-creator-page/room-creator-page.component';
import { ContentCreatePageComponent } from './content-create-page/content-create-page.component';
import { StatisticsPageComponent } from '../shared/statistics-page/statistics-page.component';
import { CommentListComponent } from '../shared/comment-list/comment-list.component';
import { FeedbackBarometerPageComponent } from '../shared/feedback-barometer-page/feedback-barometer-page.component';
import { ContentListComponent } from './content-list/content-list.component';
import { StatisticComponent } from '../shared/statistic/statistic.component';

const routes: Routes = [
  {
    path: '',
    component: HomeCreatorPageComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [UserRole.CREATOR] }
  },
  {
    path: 'room/:roomId',
    component: RoomCreatorPageComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [UserRole.CREATOR] }
  },
  {
    path: 'room/:roomId/create-content',
    component: ContentCreatePageComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [UserRole.CREATOR] }
  },
  {
    path: 'room/:roomId/statistics',
    component: StatisticsPageComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [UserRole.CREATOR] }
  },
  {
    path: 'room/:roomId/statistics/:contentId',
    component: StatisticComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [UserRole.CREATOR] }
  },
  {
    path: 'room/:roomId/comments',
    component: CommentListComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [UserRole.CREATOR] }
  },
  {
    path: 'room/:roomId/feedback-barometer',
    component: FeedbackBarometerPageComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [UserRole.CREATOR] }
  },
  {
    path: 'room/:roomId/:contentGroup',
    component: ContentListComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [UserRole.CREATOR] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CreatorRoutingModule {
}