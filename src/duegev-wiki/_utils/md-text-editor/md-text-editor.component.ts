import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import * as Showdown from 'showdown';

@Component({
  selector: 'md-text-editor',
  templateUrl: './md-text-editor.component.html',
  styleUrls: ['./md-text-editor.component.css']
})
export class MdTextEditorComponent {
  showdown = Showdown;
  converter = new this.showdown.Converter();
  testhtml = '';

  @Output() textContent = new EventEmitter<string>();
  @Input() getTextContent: boolean = false;

  onMDInput(e: Event) {
    const text = (e.target as any).value;
    this.testhtml = this.converter.makeHtml(text);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['getTextContent'].currentValue) {
      let _md_document = (<HTMLTextAreaElement>document.getElementById('mdeditor')).value;
      this.textContent.emit(_md_document);
    }
  }
}
