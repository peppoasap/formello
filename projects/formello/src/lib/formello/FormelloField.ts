import { FormControl, ValidatorFn } from '@angular/forms';
import {
  IFormelloField,
  FormelloFieldTypes,
  IFormelloFieldOption,
} from '../../public-api';

export class FormelloField<V = string> implements IFormelloField<V> {
  name: string;
  label: string;
  validators: Array<ValidatorFn> = [];
  control = new FormControl();
  type: FormelloFieldTypes;
  options: Array<IFormelloFieldOption<V>> = [];
  errors: Map<string, string> = new Map();
  disabled: boolean = false;
  readonly: boolean = false;
  datepicker: { startDate: Date } | undefined = undefined;
  elementRef: HTMLElement | undefined = undefined;
  cssClasses?: string | undefined = '';

  private _optionSearchKey?: string | undefined = undefined;

  public get numberValue() : number {
    return +this.control.value;
  }
  public get booleanValue(): boolean {
    return this.control.value === "true";
  }

  public get optionSearchKey() : string | undefined {
    return this._optionSearchKey;
  }
  public set optionSearchKey(key : string | undefined) {
    this._optionSearchKey = key;
  }

  constructor(
    _name: string,
    _label: string,
    _value: V,
    _type: FormelloFieldTypes,
    _validators?: ValidatorFn[],
    _options?: Array<IFormelloFieldOption<V>>
  ) {
    this.name = _name;
    this.label = _label;
    this.control.setValue(_value);
    this.validators = this.validators.concat(_validators ? _validators : []);
    this.control.setValidators(this.validators);
    this.control.updateValueAndValidity();
    this.type = _type;

    if (this.type !== FormelloFieldTypes.TEXT) {
      this.options = _options ? _options : [];
    }
  }

  public getCurrentErrors(): Array<string> {
    return this.control.errors ? Object.keys(this.control.errors) : [];
  }

  public setError(errorCode: string, message: string) {
    this.errors.set(errorCode, message);
  }

  /**
   *
   * @param validatorsToAdd an array of validatorFn
   * Add validators to validators array, set it in the controls and update value and validity
   */
  public addValidators(validatorsToAdd: Array<ValidatorFn>): void {
    this.validators = [...new Set([...this.validators, ...validatorsToAdd])];
    this.control.setValidators(this.validators);
    this.control.updateValueAndValidity();
  }

  /**
   *
   * @param validatorsToRemove an array of validatorFn
   * Remove validators to validators array, set it in the controls and update value and validity
   */
  public removeValidators(validatorsToRemove: Array<ValidatorFn>): void {
    this.validators = this.validators.filter(
      (x) => !validatorsToRemove.includes(x)
    );
    this.control.setValidators(this.validators);
    this.control.updateValueAndValidity();
  }

  /**
   *
   * @param validators an array of validatorFn
   * Overwrite all validators with new one array, set it in the controls and update value and validity
   */
  public setValidators(validators: Array<ValidatorFn>): void {
    this.validators = validators;
    this.control.setValidators(this.validators);
    this.control.updateValueAndValidity();
  }

  setElementRef(element: any) {
    this.elementRef = element;
  }
}
