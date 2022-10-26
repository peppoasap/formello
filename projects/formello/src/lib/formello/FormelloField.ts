import { FormControl, ValidatorFn } from '@angular/forms';
import {
  IFormelloField,
  FormelloFieldTypes,
  IFormelloFieldOption,
  FormelloDatePicker,
} from '../../public-api';

interface IOptionDatum {
  value : string;
  text : string;
}

export class FormelloField<V = string> implements IFormelloField<V> {
  name: string;
  label: string;
  validators: Array<ValidatorFn> = [];
  control = new FormControl();
  type: FormelloFieldTypes;
  private _options: Array<IFormelloFieldOption<V>> = [];
  errors: Map<string, string> = new Map();
  disabled: boolean = false;
  readonly: boolean = false;
  datepicker: FormelloDatePicker | undefined = undefined;
  elementRef: HTMLElement | undefined = undefined;
  cssClasses?: string | undefined = '';
  private _optionsData: IOptionDatum[] = [];

  private _optionSearchKey !: string;
  private _minimumSearchLength: number = 1;
  private _maxOptionsDisplayed: number = Infinity;

  public get numberValue(): number {
    return +this.control.value;
  }
  public get booleanValue(): boolean {
    return this.control.value === 'true';
  }

  public get optionSearchKey(): string {
    return this._optionSearchKey;
  }
  public set optionSearchKey(key: string) {
    this._optionSearchKey = key;
  }

  public get minimumSearchLength(): number {
    return this._minimumSearchLength;
  }
  public set minimumSearchLength(length: number) {
    this._minimumSearchLength = length;
  }

  public get maxOptionsDisplayed(): number {
    return this._maxOptionsDisplayed;
  }
  public set maxOptionsDisplayed(count: number) {
    this._maxOptionsDisplayed = count;
  }

  constructor(
    _name: string,
    _label: string,
    _value: V,
    _type: FormelloFieldTypes,
    _validators?: ValidatorFn[],
    _options : Array<IFormelloFieldOption<V>> = []
  ) {
    this.name = _name;
    this.label = _label;
    this.control.setValue(_value);
    this.validators = this.validators.concat(_validators ? _validators : []);
    this.control.setValidators(this.validators);
    this.control.updateValueAndValidity();
    this.type = _type;

    if (this.type !== FormelloFieldTypes.TEXT) {
      this.options = _options;
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

  public get options() : IFormelloFieldOption<V>[] {
    return this._options;
  }

  public set options(options : IFormelloFieldOption<V>[]) {
    this._options = options;
  }

  public get optionsData() : IOptionDatum[] {
    return this._optionsData;
  }

  public set optionsData(optionsData : IOptionDatum[]) {
    this._optionsData = optionsData;
  }
}
