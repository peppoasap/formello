import { Component } from '@angular/core';
import { Formello } from 'projects/formello/src/public-api';
import { CustomerFormConfig, CustomerFormModel, CustomerType, CustomerFormConfigLegalPerson } from './forms/customer.form';

@Component({
  selector: 'formello-app-root',
  template: `<div class="agt-p-4">
    <formello [formello]="myFormello"></formello>
  </div>`,
  styles: [],
  providers: [CustomerFormModel],
})
export class AppComponent {
  title = 'formello-app';

  myFormello: Formello<CustomerFormModel>;

  constructor(private customerFormModel: CustomerFormModel) {
    this.myFormello = new Formello(
      new CustomerFormConfig(this.customerFormModel)
    );

    this.customerFormModel.type.control.valueChanges.subscribe(() => {
      switch(this.customerFormModel.type.numberValue) {
        case CustomerType.PHYSIC:
          this.myFormello.changeConfiguration(new CustomerFormConfig(this.customerFormModel));
        break;
        case CustomerType.LEGAL:
          this.myFormello.changeConfiguration(new CustomerFormConfigLegalPerson(this.customerFormModel));
        break;
      }
    });
  }
}