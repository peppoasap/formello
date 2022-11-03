import { Component } from '@angular/core';
import { Formello } from 'projects/formello/src/public-api';
import { Subject } from 'rxjs';
import {
  CustomerFormConfig,
  CustomerFormModel,
  CustomerType,
  CustomerFormConfigLegalPerson,
} from './forms/customer.form';

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

    let options : { value : string, viewValue : string }[] = [];
    let optionsData : { value : string, text : string }[] = [];
    for(let i=0; i<100; i++) {
      options.push({ value : `${i}`, viewValue : "Opzione " + i });
      optionsData.push({ value : `${i}`, text : "Opzione " + i });
    }
    //this.customerFormModel.vatCodePrefix.optionsData = options;

    let optionsObservable = new Subject<{ value : string, viewValue : string }[]>();
    let optionsDataObservable = new Subject<{ value : string, text : string }[]>();

    this.customerFormModel.affiliateState.optionsObservable = optionsObservable.asObservable();
    this.customerFormModel.vatCodePrefix.optionsDataObservable = optionsDataObservable.asObservable();

    setTimeout(() => {
      optionsObservable.next(options);
      optionsDataObservable.next(optionsData);
    }, 5000);

    this.customerFormModel.type.placeholder = "Prova placeholder";
    this.customerFormModel.type.control.setValue(null);
    this.customerFormModel.type.control.updateValueAndValidity();

    /*
    this.customerFormModel.vatCodePrefix2.options = options;
    this.customerFormModel.vatCodePrefix3.options = options;
    */

    this.customerFormModel.type.control.valueChanges.subscribe(() => {
      switch (this.customerFormModel.type.numberValue) {
        case CustomerType.PHYSIC:
          this.myFormello.changeConfiguration(
            new CustomerFormConfig(this.customerFormModel)
          );
          break;
        case CustomerType.LEGAL:
          this.myFormello.changeConfiguration(
            new CustomerFormConfigLegalPerson(this.customerFormModel)
          );
          break;
      }
    });
  }
}
