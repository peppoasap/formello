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

import { Observable } from 'rxjs';
import {
  IFormelloFieldOption
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
export class FormelloComponent<T = string> implements OnInit, OnDestroy, AfterViewInit {
  @Input()
  formello!: Formello<T>;
  @Input() styleLibrary: 'material' | 'agatha' = 'agatha';

  @ContentChildren(FormelloCustomFieldDef, { descendants: true })
  customFieldDefs: QueryList<FormelloCustomFieldDef> | undefined;
  @ViewChildren(FormelloFieldDirective, { read: ElementRef })
  visibleFormFieldsRefs: QueryList<ElementRef> | undefined;

  filteredOptionsArray: Map<string, Observable<IFormelloFieldOption<T>[]>> =
    new Map();

  constructor() {}

  ngOnInit() {}

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

  displayFn(option: IFormelloFieldOption<T>): string {
    return option && option.viewValue ? option.viewValue : '';
  }

  getErrorsForAgatha(field: FormelloField<T>): string[] {
    return Array.from(field.errors.values());
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

  onSelectChange(value: string, field: FormelloField<T>) {
    const select = field.elementRef?.firstElementChild?.getElementsByTagName(
      'select'
    )[0] as HTMLSelectElement;
    if (select) {
      select.value = value;
      console.log('UPDATING SELECT');
    }
  }
}
