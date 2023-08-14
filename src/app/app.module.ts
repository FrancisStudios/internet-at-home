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
import { ArticleListViewerComponent } from '../duegev-wiki/owners-menu-options/article-list-viewer/article-list-viewer.component';
import { AccountSettingsViewerComponent } from 'src/duegev-wiki/owners-menu-options/account-settings-viewer/account-settings-viewer.component';

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
    AccountSettingsViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatCardModule
  ],
  providers: [
  ],
  bootstrap: [CrossroadComponent]
})
export class AppModule { }
