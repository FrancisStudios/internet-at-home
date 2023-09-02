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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ArticleListViewerComponent } from '../duegev-wiki/owners-menu-options/article-list-viewer/article-list-viewer.component';
import { AccountSettingsViewerComponent } from 'src/duegev-wiki/owners-menu-options/account-settings-viewer/account-settings-viewer.component';
import { DuegevBrowseComponent } from '../duegev-wiki/duegev-browse/duegev-browse.component';
import { AuthenticationService } from 'src/ultils/services/authentication-service/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { WikiArticleService } from 'src/ultils/services/article-provider-service/wiki-article.service';
import { DuegevTimeProvider } from 'src/ultils/services/duegev-wiki-proprietary/duegev-time-provider.service';
import { CustomChipListComponent } from '../ultils/custom-ui/custom-chip-list/custom-chip-list.component';
import { GetUserByService } from 'src/ultils/services/authentication-service/get-user-by.service';
import { LabelsAndCategoriesService } from 'src/ultils/services/article-provider-service/labels-and-categories.service';
import { DuegevArticleLikeService } from 'src/ultils/services/article-provider-service/like.service';
import { DuegevDocumentViewerComponent } from '../duegev-wiki/_utils/duegev-document-viewer/duegev-document-viewer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DuegevHomePanelComponent } from '../duegev-wiki/owners-menu-options/duegev-home-panel/duegev-home-panel.component';
import { DuegevSearchEngine } from 'src/ultils/services/duegev-wiki-proprietary/duegev-search-engine.service';
import { DuegevArticleRecyclerItemComponent } from '../ultils/custom-ui/duegev-article-recycler-item/duegev-article-recycler-item.component';
import { ArticleEditorComponent } from '../duegev-wiki/_utils/article-editor/article-editor.component';
import { InternetAtHomeLanguageService } from 'src/ultils/services/language.service';

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
    CustomChipListComponent,
    DuegevDocumentViewerComponent,
    DuegevHomePanelComponent,
    DuegevArticleRecyclerItemComponent,
    ArticleEditorComponent
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
    MatAutocompleteModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule
  ],
  providers: [
    AuthenticationService,
    WikiArticleService,
    DuegevTimeProvider,
    LabelsAndCategoriesService,
    GetUserByService,
    DuegevArticleLikeService,
    InternetAtHomeLanguageService,
    DuegevSearchEngine,
    MatDialog
  ],
  bootstrap: [CrossroadComponent]
})
export class AppModule { }
