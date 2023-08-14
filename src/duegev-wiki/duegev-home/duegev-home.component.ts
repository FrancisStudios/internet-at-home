import { Component, OnInit } from '@angular/core';
import { VIEWPORTS } from 'src/data-types/duegev-wiki/viewports.enum';

@Component({
  selector: 'app-duegev-home',
  templateUrl: './duegev-home.component.html',
  styleUrls: [
    './duegev-home.component.css',
  ]
})
export class DuegevHomeComponent {
  viewPort: VIEWPORTS = VIEWPORTS.ACCOUNTVIEW;

  ngOnInit(): void {
    this.viewPort = VIEWPORTS.ACCOUNTVIEW;
  }

  get isAccountView(): boolean {
    return (this.viewPort === VIEWPORTS.ACCOUNTVIEW);
  }
}
