import { Component } from '@angular/core';

const __componentPrefix = './browser.at-home';

@Component({
  selector: 'app-root',
  templateUrl: `${__componentPrefix}.html`,
  styleUrls: [`${__componentPrefix}.css`]
})
export class AppComponent {
  title = 'internet-at-home';
}
