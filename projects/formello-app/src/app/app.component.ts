import { Component } from '@angular/core';
import { Formello } from 'projects/formello/src/public-api';
import { CustomerFormConfig, CustomerFormModel } from './forms/customer.form';

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
  }
}
