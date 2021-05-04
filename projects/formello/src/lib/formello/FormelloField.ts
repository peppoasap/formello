import { FormControl, ValidatorFn } from "@angular/forms";
import { IFormelloField, FormelloFieldTypes, IFormelloFieldOption } from "../../public-api";

export class FormelloField implements IFormelloField {
    name: string;
    label: string;
    validators: Array<ValidatorFn> = [];
    control = new FormControl();
    type: FormelloFieldTypes;
    options: Array<IFormelloFieldOption> = [];
    errors: Map<string, string> = new Map();
    disabled: boolean = false;
    readonly: boolean = false;

    constructor(_name: string, _label: string, _value: string | number | boolean | null, _type: FormelloFieldTypes, _validators?: ValidatorFn[], _options?: Array<IFormelloFieldOption>) {
        this.name = _name;
        this.label = _label;
        this.control.setValue(_value)
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





}