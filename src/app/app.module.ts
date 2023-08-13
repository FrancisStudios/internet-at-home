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

@NgModule({
  declarations: [
    BrowserAtHomeComponent,
    CrossroadComponent,
    DuegevHomeComponent,
    DuegevAccountComponent,
    MdTextEditorComponent,
    MdArticleViewerComponent,
    IdentityProviderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [CrossroadComponent]
})
export class AppModule { }
