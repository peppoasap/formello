import { AfterContentInit, Component, ContentChildren, Input, OnDestroy, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IFormelloFieldOption, FormelloFieldTypes } from '../models/interfaces/IFormelloField.interface';
import { FormelloCustomFieldDef } from './custom-field-def.directive';
import { Formello } from './formello/Formello';

@Component({
  selector: 'formello',
  templateUrl: 'formello.component.html',
  styleUrls: ['formello.component.scss'],
})
export class FormelloComponent<T> implements OnInit, OnDestroy {

  @Input()
  formello!: Formello<T>;

  @ContentChildren(FormelloCustomFieldDef, { descendants: true }) customFieldDefs: QueryList<FormelloCustomFieldDef> | undefined;

  filteredOptionsArray: Map<string, Observable<IFormelloFieldOption[]>> = new Map();

  constructor() { }

  ngOnInit() {

    Object.keys(this.formello.getConfig().model).forEach(key => {
      const field = (this.formello.getConfig().model as any)[key];
      if (field.type === FormelloFieldTypes.SEARCH_SELECT) {
        this.filteredOptionsArray.set(key, field.control.valueChanges.pipe(
          startWith(''),
          map((value: any) => typeof value === 'string' ? value : value.viewValue),
          map((viewValue: any) => viewValue ? this._filter(field.options, viewValue) : field.options.slice()),
        ));
      }
    });
  }

  ngOnDestroy() {
  }

  getCustomField(name: string): FormelloCustomFieldDef | undefined {
    return this.customFieldDefs?.find((field) => field.name === name);
  }

  getCustomFieldTemplate(name: string): TemplateRef<any> | undefined {
    return this.customFieldDefs?.find((field) => field.name === name)?.templateRef;
  }

  displayFn(option: IFormelloFieldOption): string {
    return option && option.viewValue ? option.viewValue : '';
  }

  private _filter(options: IFormelloFieldOption[], value: string): IFormelloFieldOption[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.viewValue.toLowerCase().includes(filterValue));
  }
}
