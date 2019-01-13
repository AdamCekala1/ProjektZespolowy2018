import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorWrapper } from '../../../../../projects/ac-search-result/src/lib/shared/class/control-value-accessor-wrapper.class';

@Component({
  selector: 'ac-user-personal-detail',
  templateUrl: './user-personal-detail.component.html',
  styleUrls: ['./user-personal-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: UserPersonalDetailComponent,
    multi: true,
  }],
})
export class UserPersonalDetailComponent extends ControlValueAccessorWrapper implements ControlValueAccessor {
  @Input() title: string;
  @Input() oryginalValue: string;
  value: string;
  isEditMode: boolean = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  writeValue(value: string) {
    this.value = value;
  }

  saveChanges(value: string) {
    this.onChange(value);
    this.writeValue(value);

    this.changeDetectorRef.detectChanges();
  }

  isChanged(): boolean {
    return this.value !== this.oryginalValue;
  }
}
