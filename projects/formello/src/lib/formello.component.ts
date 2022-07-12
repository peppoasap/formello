import {
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
} from 'rxjs/operators';
import {
  IFormelloFieldOption,
  FormelloFieldTypes,
} from '../models/interfaces/IFormelloField.interface';
import { FormelloCustomFieldDef } from './custom-field-def.directive';
import { FormelloFieldDirective } from './formello-field.directive';
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
  @ViewChildren(FormelloFieldDirective, { read: ElementRef })
  visibleFormFieldsRefs: QueryList<ElementRef> | undefined;

  filteredOptionsArray: Map<string, Observable<IFormelloFieldOption[]>> =
    new Map();

  constructor() {}

  ngOnInit() {
    Object.keys(this.formello.getConfig().model).forEach((key) => {
      const field = (this.formello.getConfig().model as any)[
        key
      ] as FormelloField;
      if (field.type === FormelloFieldTypes.SEARCH_SELECT) {
        this.filteredOptionsArray.set(
          key,
          field.control.valueChanges.pipe(
            /* startWith(''), !DEPRECATED! */
            debounceTime(300),
            distinctUntilChanged(),
            filter(Boolean), // not null
            map((value: any) => {
              if(!value || typeof value === 'string')
                return value;

              return (field && field.optionSearchKey) ?
                value[field.optionSearchKey] :
                value.viewValue;
            }),
            map((searchText: string) => {
              if (!searchText) {
                return field.options.slice(0, field.maxOptionsDisplayed);
              }

              if (searchText.length < field.minimumSearchLength) {
                return [];
              }

              return this._filter(
                field.options,
                searchText,
                field.maxOptionsDisplayed
              );
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
    filterText: string,
    maxOptions: number = options.length
  ): IFormelloFieldOption[] {
    const filterValue = filterText.toLowerCase();
    return options
      .filter((option) => option.viewValue.toLowerCase().includes(filterValue))
      .slice(0, maxOptions);
  }

  private updateElementRef(): void {
    this.formello
      .getConfig()
      .rows.forEach((row) =>
        row.fields.forEach((field) =>
          field
            ? field.setElementRef(
                this.visibleFormFieldsRefs?.find(
                  (visibleField) =>
                    (visibleField.nativeElement as HTMLElement).id ===
                    field.name
                )?.nativeElement
              )
            : null
        )
      );
  }
}
