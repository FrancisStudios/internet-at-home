import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAtHomeComponent } from './browser/browser.at-home';
import { AppRoutingModule } from './app-routing.module';
import { CrossroadComponent } from './crossroad/crossroad.component';
import { DuegevHomeComponent } from '../duegev-wiki/duegev-home/duegev-home.component';
import { DuegevAccountComponent } from 'src/duegev-wiki/duegev-account/duegev-account.component';
import { MdTextEditorComponent } from '../duegev-wiki/_utils/md-text-editor/md-text-editor.component';
import { MdArticleViewerComponent } from '../duegev-wiki/_utils/md-article-viewer/md-article-viewer.component';
import { IdentityProviderComponent } from '../ultils/identity-provider/identity-provider.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ArticleListViewerComponent } from '../duegev-wiki/owners-menu-options/article-list-viewer/article-list-viewer.component';
import { AccountSettingsViewerComponent } from 'src/duegev-wiki/owners-menu-options/account-settings-viewer/account-settings-viewer.component';
import { DuegevBrowseComponent } from '../duegev-wiki/duegev-browse/duegev-browse.component';
import { AuthenticationService } from 'src/ultils/services/authentication-service/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { WikiArticleService } from 'src/ultils/services/article-provider-service/wiki-article.service';
import { DuegevTimeProvider } from 'src/ultils/services/duegev-wiki-proprietary/duegev-time-provider.service';
import { CustomChipListComponent } from '../ultils/custom-ui/custom-chip-list/custom-chip-list.component';
import { GetUserByService } from 'src/ultils/services/authentication-service/get-user-by.service';

@NgModule({
  declarations: [
    BrowserAtHomeComponent,
    CrossroadComponent,
    DuegevHomeComponent,
    DuegevAccountComponent,
    MdTextEditorComponent,
    MdArticleViewerComponent,
    IdentityProviderComponent,
    ArticleListViewerComponent,
    AccountSettingsViewerComponent,
    DuegevBrowseComponent,
    CustomChipListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule,
    MatFormFieldModule,
    HttpClientModule,
  ],
  providers: [
    AuthenticationService,
    WikiArticleService,
    DuegevTimeProvider,
    GetUserByService
  ],
  bootstrap: [CrossroadComponent]
})
export class AppModule { }
