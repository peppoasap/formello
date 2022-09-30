import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  FormelloFieldTypes,
  IFormelloConfig,
  IFormelloField,
} from '../../public-api';

export class Formello<T> {
  private _config: IFormelloConfig<T>;
  private _formGroup: FormGroup = new FormGroup({});

  constructor(config: IFormelloConfig<T>) {
    this._config = config;
    this.generateFormGroup();
  }

  private generateFormGroup() {
    this._formGroup = new FormGroup({});
    this.getFieldsFromRow().forEach((field) => {
      if (
        field &&
        field.name &&
        field.control &&
        field.type !== FormelloFieldTypes.EMPTY &&
        field.type !== FormelloFieldTypes.BUTTON
      ) {
        this._formGroup.addControl(field.name, field.control);
      }
    });
  }

  private getFieldsFromRow(): Array<IFormelloField> {
    return this._config.rows.reduce(
      (accumulator: any, currentValue) =>
        accumulator.concat(currentValue.fields),
      []
    );
  }

  public getForm() {
    return this._formGroup;
  }

  public getConfig() {
    return this._config;
  }

  public changeConfiguration(config: IFormelloConfig<T>) {
    //Persist model in rows set - to avoid data loss and valueChanges resubscriptions
    this._config.rows = config.rows.map((row) => {
      let modelAsAny = this._config.model as any;
      row.fields.forEach((field) =>
        field && field.name && modelAsAny[field.name]
          ? (field.control = modelAsAny[field.name].control)
          : null
      );
      return row;
    });

    this.generateFormGroup();
  }

  public valueChanges(): Observable<any> {
    return this.getForm().valueChanges;
  }
}
