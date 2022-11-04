import { FormControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { IOptionDatum } from './IOptionDatum.interface';

export interface IFormelloField<V = string> {
  name: string;
  label: string;
  validators: Array<ValidatorFn>;
  control: FormControl;
  type: FormelloFieldTypes;

  options: Array<IFormelloFieldOption<V>>;
  optionsObservable : Observable<IFormelloFieldOption<V>[]>;
  optionsData: IOptionDatum<V>[];
  optionsDataObservable: Observable<IOptionDatum<V>[]>;

  errors: Map<string, string>;
  disabled: boolean;
  readonly: boolean;
  datepicker?: FormelloDatePicker;
  elementRef: HTMLElement | undefined;
  cssClasses?: string;

  numberValue: number;
  booleanValue: boolean;

  getCurrentErrors(): Array<string>;
  addValidators(validatorsToAdd: Array<ValidatorFn>): void;
  removeValidators(validatorsToRemove: Array<ValidatorFn>): void;
  setValidators(validators: Array<ValidatorFn>): void;
  setElementRef(element: any): void;
}

export interface IFormelloFieldOption<V = string> {
  value: V | null;
  viewValue: string;
  text ?: string; // compatibility
}

export enum FormelloFieldTypes {
  TEXT = 'TEXT',
  SELECT = 'SELECT',
  RADIO = 'RADIO',
  CHECK = 'CHECK',
  SEARCH_SELECT = 'SEARCH_SELECT',
  DATE = 'DATE',
  TIME = 'TIME',
  SWITCH = 'SWITCH',
  EMPTY = 'EMPTY',
  BUTTON = 'BUTTON',
  TEMPLATE_REF = 'TEMPLATE_REF',
}

export type EMPTY_FIELD_TYPE = null;

export interface FormelloDatePicker {
  startDate?: Date;
  minDate?: Date;
  maxDate?: Date;
}
