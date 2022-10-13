import {
  AfterViewInit,
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
export class FormelloComponent<T> implements OnInit, OnDestroy, AfterViewInit {
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
    Object.keys(this.formello.getConfig().model as any).forEach((key) => {
      const field = (this.formello.getConfig().model as any)[
        key
      ] as FormelloField;
      if (field.type === FormelloFieldTypes.SEARCH_SELECT) {
        //this.filteredOptionsArray.set(
        //  key,
        //  field.control.valueChanges.pipe(
        //    /* startWith(''), !DEPRECATED! */
        //    debounceTime(300),
        //    distinctUntilChanged(),
        //    filter(Boolean), // not null
        //    map((value: any) => {
        //      if (!value || typeof value === 'string') return value;
//
        //      return field && field.optionSearchKey
        //        ? value[field.optionSearchKey]
        //        : value.viewValue;
        //    }),
        //    map((searchText: string) => {
        //      if (!searchText) {
        //        return field.options.slice(0, field.maxOptionsDisplayed);
        //      }
//
        //      if (searchText.length < field.minimumSearchLength) {
        //        return [];
        //      }
//
        //      return this._filter(
        //        field.options,
        //        searchText,
        //        field.maxOptionsDisplayed
        //      );
        //    })
        //  )
        //);
      } else if (field.type === FormelloFieldTypes.SELECT) {
        // field.control.valueChanges.subscribe((value: string) =>
        //   this.onSelectChange(value, field)
        // );
      } else if (field.type === FormelloFieldTypes.TEMPLATE_REF) {
      }
    });
  }

  ngAfterViewInit(): void {
    this.updateElementRef();

    this.visibleFormFieldsRefs?.changes.subscribe((_) => {
      console.log('UPDATING REFS');
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

  onSelectChange(value: string, field: FormelloField) {
    const select = field.elementRef?.firstElementChild?.getElementsByTagName(
      'select'
    )[0] as HTMLSelectElement;
    if (select) {
      select.value = value;
      console.log('UPDATING SELECT');
    }
  }
}
