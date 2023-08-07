import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAtHomeComponent } from './browser.at-home';
import { AppRoutingModule } from './app-routing.module';
import { CrossroadComponent } from './crossroad/crossroad.component';
import { DuegevHomeComponent } from '../duegev-wiki/duegev-home/duegev-home.component';
import { DuegevAccountComponent } from 'src/duegev-wiki/duegev-account/duegev-account.component';

@NgModule({
  declarations: [
    BrowserAtHomeComponent,
    CrossroadComponent,
    DuegevHomeComponent,
    DuegevAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [CrossroadComponent]
})
export class AppModule { }
