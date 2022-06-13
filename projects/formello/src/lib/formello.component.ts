import {
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith } from 'rxjs/operators';
import {
  IFormelloFieldOption,
  FormelloFieldTypes,
} from '../models/interfaces/IFormelloField.interface';
import { FormelloCustomFieldDef } from './custom-field-def.directive';
import { Formello } from './formello/Formello';
import { FormelloField } from './formello/FormelloField';

@Component({
  selector: 'formello',
  templateUrl: 'formello.component.html',
  styleUrls: ['formello.component.scss'],
})
export class FormelloComponent<T> implements OnInit, OnDestroy {
  @Input()
  formello!: Formello<T>;
  @Input() styleLibrary: 'material' | 'agatha' = 'agatha';

  @ContentChildren(FormelloCustomFieldDef, { descendants: true })
  customFieldDefs: QueryList<FormelloCustomFieldDef> | undefined;
  @ViewChildren(MatFormField) visibleFormFieldsRefs:
    | QueryList<MatFormField>
    | undefined;

  filteredOptionsArray: Map<string, Observable<IFormelloFieldOption[]>> =
    new Map();

  constructor() {}

  ngOnInit() {
    Object.keys(this.formello.getConfig().model).forEach((key) => {
      const field = (this.formello.getConfig().model as any)[key] as FormelloField;
      if (field.type === FormelloFieldTypes.SEARCH_SELECT) {
        this.filteredOptionsArray.set(
          key,
          field.control.valueChanges.pipe(
            /* startWith(''), !DEPRECATED! */
            debounceTime(400),
            distinctUntilChanged(),
            map((value: any) => {
              if(typeof value === 'string')
                return value;

              return (field && field.optionSearchKey) ?
                value[field.optionSearchKey] :
                value.viewValue;
              }),
            map((searchText: string) => {
              if(searchText.length < field.minimumSearchLength)
                return [];

              return searchText
                ? this._filter(field.options, searchText)
                : field.options.slice();
            })
          )
        );
      }
    });

    this.visibleFormFieldsRefs?.changes.subscribe((_) => {
      this.updateElementRef();
    });
  }

  ngOnDestroy() {}

  getCustomField(name: string): FormelloCustomFieldDef | undefined {
    return this.customFieldDefs?.find((field) => field.name === name);
  }

  getCustomFieldTemplate(name: string): TemplateRef<any> | null {
    const finded = this.customFieldDefs?.find((field) => field.name === name);
    return finded ? finded.templateRef : null;
  }

  displayFn(option: IFormelloFieldOption): string {
    return option && option.viewValue ? option.viewValue : '';
  }

  getErrorsForAgatha(field: FormelloField): string[] {
    return Array.from(field.errors.values());
  }

  private _filter(
    options: IFormelloFieldOption[],
    filterText: string
  ): IFormelloFieldOption[] {
    const filterValue = filterText.toLowerCase();
    return options.filter((option) =>
      option.viewValue.toLowerCase().includes(filterValue)
    );
  }

  private updateElementRef(): void {
    this.formello
      .getConfig()
      .rows.forEach((row) =>
        row.fields.forEach((field) =>
          field
            ? field.setElementRef(
                this.visibleFormFieldsRefs?.find(
                  (matFormField) =>
                    (matFormField._elementRef.nativeElement as HTMLElement)
                      .id === field.name
                )?._inputContainerRef.nativeElement
              )
            : null
        )
      );
  }
}
