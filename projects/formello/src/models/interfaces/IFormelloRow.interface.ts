import { EMPTY_FIELD_TYPE, IFormelloField } from './IFormelloField.interface';

export interface IFormelloRow {
  fields: Array<IFormelloField | EMPTY_FIELD_TYPE>;
}
