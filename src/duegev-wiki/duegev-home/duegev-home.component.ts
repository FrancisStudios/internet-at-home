import { Component } from '@angular/core';
import * as Showdown from 'showdown';

@Component({
  selector: 'app-duegev-home',
  templateUrl: './duegev-home.component.html',
  styleUrls: [
    './duegev-home.component.css',
  ]
})
export class DuegevHomeComponent {
  showdown = Showdown;
  converter = new this.showdown.Converter();
  testhtml = '';
  
  testText: string = '#This is my MD document \n this is just a document \n - point1 \n - point2'

  onMDInput(e: Event){
    const text = (e.target as any).value;
    this.testhtml = this.converter.makeHtml(text);
  }
}
