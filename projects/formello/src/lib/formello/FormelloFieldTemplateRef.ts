import { TemplateRef } from '@angular/core';
import { FormelloFieldTypes } from '../../public-api';

export class FormelloFieldTemplateRef<T> {
  private templateRef: TemplateRef<T>;
  public name: string;
  public label: string;
  public type: FormelloFieldTypes;
  elementRef: HTMLElement | undefined = undefined;

  constructor(_name: string, _label: string, templateRef: TemplateRef<any>) {
    this.templateRef = templateRef;
    this.name = _name;
    this.label = _label;
    this.type = FormelloFieldTypes.TEMPLATE_REF;
  }

  public get template(): TemplateRef<T> {
    return this.templateRef;
  }

  public set template(template: TemplateRef<T>) {
    this.templateRef = template;
  }

  public setElementRef(element: any) {
    this.elementRef = element;
  }
}
