import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { ISelectConfig } from '../select.interface';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger('-100ms', [
            animate('0.2s', style({
              opacity: 0,
            }))
          ])
        ], {optional: true}),
        query(':enter', [
          style({ opacity: 0 }),
          stagger('100ms', [
            animate('0.2s', style({
              opacity: 1,
            }))
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class SelectListComponent {
  @Input() mobileBackText: string = 'Back to page';
  @Input() values: string[] = [];
  @Input() config: ISelectConfig = {};
  @Output() onSelect: EventEmitter<string> = new EventEmitter();
  @Output() onMobileClose: EventEmitter<boolean> = new EventEmitter();

  selectValue(value: string) {
    this.onSelect.emit(value);
  }

  closeDropdown() {
    this.onMobileClose.emit(true);
  }
}
