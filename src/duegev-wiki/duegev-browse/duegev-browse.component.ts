import { Component } from '@angular/core';

@Component({
  selector: 'duegev-browse',
  templateUrl: './duegev-browse.component.html',
  styleUrls: ['./duegev-browse.component.css']
})
export class DuegevBrowseComponent {
  testArrayForNgFor: string[] = [
    'a', 'b'
  ]

  labels: string[] = [
    'dynar', 'alliance'
  ]
}
