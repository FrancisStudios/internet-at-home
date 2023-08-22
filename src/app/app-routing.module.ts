import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAtHomeComponent } from './browser/browser.at-home';
import { DuegevHomeComponent } from 'src/duegev-wiki/duegev-home/duegev-home.component';
import { IdentityProviderComponent } from 'src/ultils/identity-provider/identity-provider.component';
import { DuegevDocumentViewerComponent } from 'src/duegev-wiki/_utils/duegev-document-viewer/duegev-document-viewer.component';

const routes: Routes = [
  { path: '', component: BrowserAtHomeComponent },
  { path: 'duegev-wiki', component: DuegevHomeComponent },
  { path: 'utils/identity-provider', component: IdentityProviderComponent },
  { path: 'utils/identity-provider/:from', component: IdentityProviderComponent },
  { path: 'article-viewer/:article_id', component: DuegevDocumentViewerComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
