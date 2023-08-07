import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAtHomeComponent } from './browser.at-home';
import { DuegevHomeComponent } from 'src/duegev-wiki/duegev-home/duegev-home.component';

const routes: Routes = [
  {path: '', component: BrowserAtHomeComponent},
  {path: 'duegev-wiki', component: DuegevHomeComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
