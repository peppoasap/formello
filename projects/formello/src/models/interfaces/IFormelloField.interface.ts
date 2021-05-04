import { FormControl, ValidatorFn } from "@angular/forms";

export interface IFormelloField {
    name: string,
    label: string,
    validators: Array<ValidatorFn>,
    control: FormControl,
    type: FormelloFieldTypes,
    options: Array<IFormelloFieldOption>,
    errors: Map<string, string>
    disabled: boolean;
    readonly: boolean;

    getCurrentErrors(): Array<string>
}

export interface IFormelloFieldOption {
    value: string | number | boolean,
    viewValue: string
}

export enum FormelloFieldTypes {
    TEXT = 'TEXT',
    SELECT = 'SELECT',
    RADIO = 'RADIO',
    CHECK = 'CHECK',
    SEARCH_SELECT = 'SEARCH_SELECT',
    DATE = 'DATE'
}
