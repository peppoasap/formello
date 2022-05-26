import { EMPTY_FIELD_TYPE, IFormelloField } from './IFormelloField.interface';

export interface IFormelloRow {
  fields: Array<IFormelloField<any> | EMPTY_FIELD_TYPE>;
}
