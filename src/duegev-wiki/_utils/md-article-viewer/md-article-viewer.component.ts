import { Component, Input, OnInit } from '@angular/core';
import * as Showdown from 'showdown';
@Component({
  selector: 'md-article-viewer',
  templateUrl: './md-article-viewer.component.html',
  styleUrls: ['./md-article-viewer.component.css']
})
export class MdArticleViewerComponent implements OnInit {
  @Input() articleContent: string = '';
  HTMLContent = '';

  showdown = Showdown;
  converter = new this.showdown.Converter();

  ngOnInit(): void {
    this.HTMLContent = this.converter.makeHtml(this.articleContent);
  }
}
