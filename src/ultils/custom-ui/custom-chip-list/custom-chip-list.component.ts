import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-chip-list',
  templateUrl: './custom-chip-list.component.html',
  styleUrls: ['./custom-chip-list.component.css']
})

export class CustomChipListComponent {
  @Input() listName: string = '';
  @Input() chips: CustomChipType[] = [];
}

export type CustomChipType = {
  text: string, color: string
}

export type CustomChipListType = {
  listName: string,
  chips: CustomChipType[]
}