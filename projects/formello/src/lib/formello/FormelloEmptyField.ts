import {
  EMPTY_FIELD_TYPE,
  FormelloFieldTypes,
} from '../../models/interfaces/IFormelloField.interface';
import { FormelloField } from './FormelloField';

export const EMPTY_FIELD = (
  cssClasses?: string,
  name?: string
): FormelloField | EMPTY_FIELD_TYPE => {
  if (cssClasses) {
    const emptyField = new FormelloField(
      name || 'empty',
      '',
      '',
      FormelloFieldTypes.EMPTY
    );
    emptyField.cssClasses = cssClasses;
    return emptyField;
  }
  return null;
};
