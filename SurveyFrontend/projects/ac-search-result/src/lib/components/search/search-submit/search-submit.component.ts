import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-submit',
  templateUrl: './search-submit.component.html',
  styleUrls: ['./search-submit.component.scss']
})
export class SearchSubmitComponent {
  @Input() isDisabled: boolean = true;
  @Output() onSubmit: EventEmitter<boolean> = new EventEmitter();

  submit() {
    this.onSubmit.emit(true);
  }
}
