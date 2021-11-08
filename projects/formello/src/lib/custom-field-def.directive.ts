import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[customFieldDef]'
})
export class FormelloCustomFieldDef {
  /** Unique name for this field. */
  @Input('customFieldDef')
  name: string | undefined;

  protected _name!: string;

  constructor(public templateRef: TemplateRef<any>) {
  }

}
