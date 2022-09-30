import { FormelloFieldTemplateRef } from '../../lib/formello/FormelloFieldTemplateRef';
import { FormelloFieldButton } from '../../public-api';
import { EMPTY_FIELD_TYPE, IFormelloField } from './IFormelloField.interface';

export interface IFormelloRow {
  fields: Array<IFormelloField<any> | FormelloFieldButton | EMPTY_FIELD_TYPE>;
}
