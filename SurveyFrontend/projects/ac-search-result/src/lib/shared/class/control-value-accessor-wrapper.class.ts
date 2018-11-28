export abstract class ControlValueAccessorWrapper {
  onTouchedCallback: () => void = () => {};
  onChange: (value: any) => void = () => {};

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  writeValue(..._: any[]) {
  }
}
