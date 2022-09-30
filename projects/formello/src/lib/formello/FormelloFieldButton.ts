import { FormControl } from '@angular/forms';
import { FormelloFieldTypes } from '../../public-api';

export class FormelloFieldButton {
  name: string;
  label: string;
  type: FormelloFieldTypes;
  cssClasses?: string | undefined = '';
  elementRef: HTMLElement | undefined = undefined;
  disabled: boolean = false;
  onClickCallback: Function | undefined = undefined;
  buttonType: 'primary' | 'secondary' | 'text' = 'primary';
  control = new FormControl();

  constructor(
    _name: string,
    _label: string,
    _onClickCallback?: Function,
    cssClasses?: string,
    buttonType?: 'primary' | 'secondary' | 'text'
  ) {
    this.name = _name;
    this.label = _label;
    this.type = FormelloFieldTypes.BUTTON;
    this.onClickCallback = _onClickCallback;
    this.cssClasses = cssClasses;
    this.buttonType = buttonType || 'primary';
  }

  public setElementRef(element: any) {
    this.elementRef = element;
  }
}
