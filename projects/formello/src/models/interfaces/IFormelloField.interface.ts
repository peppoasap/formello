import { FormControl, ValidatorFn } from '@angular/forms';

export interface IFormelloField<V = string> {
  name: string;
  label: string;
  validators: Array<ValidatorFn>;
  control: FormControl;
  type: FormelloFieldTypes;
  options: Array<IFormelloFieldOption<V>>;
  errors: Map<string, string>;
  disabled: boolean;
  readonly: boolean;
  datepicker?: {
    startDate?: Date;
  };
  elementRef: HTMLElement | undefined;
  cssClasses?: string;

  numberValue : number;
  booleanValue : boolean;

  getCurrentErrors(): Array<string>;
  addValidators(validatorsToAdd: Array<ValidatorFn>): void;
  removeValidators(validatorsToRemove: Array<ValidatorFn>): void;
  setValidators(validators: Array<ValidatorFn>): void;
  setElementRef(element: any): void;
}

export interface IFormelloFieldOption<V = string> {
  value: V;
  viewValue: string;
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
}

export type EMPTY_FIELD_TYPE = null;
