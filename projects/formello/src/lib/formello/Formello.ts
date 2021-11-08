import { ThrowStmt } from "@angular/compiler";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { IFormelloConfig, IFormelloField } from "../../public-api";
import { FormelloField } from "./FormelloField";

export class Formello<T>{

    private _config: IFormelloConfig<T>;
    private _keys: Array<string> = [];
    private _formGroup: FormGroup = new FormGroup({});

    constructor(config: IFormelloConfig<T>) {
        this._config = config;
        this.setKeysFromModel();
        this.generateFormGroup();
    }

    private generateFormGroup() {
        this._formGroup = new FormGroup({});
        this.getFieldsFromRow().forEach(field => {
            if (field && field.name && field.control) {
                this._formGroup.addControl(field.name, field.control);
            }
        });
    }

    private getFieldsFromRow(): Array<IFormelloField> {
        return this._config.rows.reduce((accumulator: any, currentValue) => accumulator.concat(currentValue.fields), []);
    }

    private setKeysFromModel() {
        this._keys = Object.keys(this._config.model);
    }

    public getForm() {
        return this._formGroup;
    }

    public getConfig() {
        return this._config;
    }

    public changeConfiguration(config: IFormelloConfig<T>) {
        //Persist model in rows set - to avoid data loss and valueChanges resubscriptions
        this._config.rows = config.rows.map(row => {
            row.fields.forEach(field => field.control = (this._config.model as any)[field.name].control);
            return row;
        });

        this.generateFormGroup();
    }

    public valueChanges(): Observable<any> {
        return this.getForm().valueChanges;
    }

}