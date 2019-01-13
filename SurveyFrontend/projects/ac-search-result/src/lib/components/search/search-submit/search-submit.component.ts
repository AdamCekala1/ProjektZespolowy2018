import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-submit',
  templateUrl: './search-submit.component.html',
  styleUrls: ['./search-submit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSubmitComponent {
  @Input() isDisabled: boolean = true;
  @Output() onSubmit: EventEmitter<boolean> = new EventEmitter();

  submit() {
    this.onSubmit.emit(true);
  }
}
