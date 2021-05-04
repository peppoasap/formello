import { ValidatorFn, Validators } from "@angular/forms";
import { distinctUntilChanged, map } from "rxjs/operators";
import { GENERIC_ERROR_CODES, GENERIC_ERROR_MESSAGES } from "../../models/GenericErrors.enum";
import { FormelloFieldTypes } from "../../models/interfaces/IFormelloField.interface";
import { FormelloField } from "../formello/FormelloField";

const PATTERN_ITALIAN_TAX_CODE = "^[A-Za-z]{6}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{3}[A-Za-z]{1}$";

export class TaxCodeField extends FormelloField {

    constructor(name: string, label: string, value: string, validators?: Array<ValidatorFn>) {
        super(name, label, value, FormelloFieldTypes.TEXT, [Validators.pattern(PATTERN_ITALIAN_TAX_CODE)].concat(validators ? validators : []));
        this.control.valueChanges.pipe(distinctUntilChanged()).subscribe((value: string) => this.control.patchValue(value.toUpperCase()));

        this.setError(GENERIC_ERROR_CODES.PATTERN, GENERIC_ERROR_MESSAGES.TAX_CODE)
    }

}