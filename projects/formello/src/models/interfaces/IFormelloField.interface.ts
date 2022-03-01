import { FormControl, ValidatorFn } from "@angular/forms";

export interface IFormelloField {
    name: string,
    label: string,
    validators: Array<ValidatorFn>,
    control: FormControl,
    type: FormelloFieldTypes,
    options: Array<IFormelloFieldOption>,
    errors: Map<string, string>,
    disabled: boolean,
    readonly: boolean,
    datepicker?: {
        startDate?: Date;
    }
    elementRef: HTMLElement | undefined;

    getCurrentErrors(): Array<string>;
    addValidators(validatorsToAdd: Array<ValidatorFn>): void;
    removeValidators(validatorsToRemove: Array<ValidatorFn>): void;
    setValidators(validators: Array<ValidatorFn>): void;
    setElementRef(element: any): void;
}

export interface IFormelloFieldOption {
    value: string | number,
    viewValue: string
}

export enum FormelloFieldTypes {
    TEXT = 'TEXT',
    SELECT = 'SELECT',
    RADIO = 'RADIO',
    CHECK = 'CHECK',
    SEARCH_SELECT = 'SEARCH_SELECT',
    DATE = 'DATE',
    TIME = 'TIME',
    SWITCH = 'SWITCH'
}
