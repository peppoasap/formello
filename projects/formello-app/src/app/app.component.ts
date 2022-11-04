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

    let optionsData : { value : string, text : string }[] = [];
    for(let i=0; i<100; i++) {
      optionsData.push({ value : `${i}`, text : "Opzione " + i });
    }

    let optionsDataObservable = new Subject<{ value : string, text : string }[]>();

    this.customerFormModel.affiliateState.optionsDataObservable = optionsDataObservable.asObservable();
    this.customerFormModel.vatCodePrefix.optionsDataObservable = optionsDataObservable.asObservable();

    setTimeout(() => {
      optionsDataObservable.next(optionsData);
    }, 2000);

    /*
    this.customerFormModel.vatCodePrefix2.options = options;
    this.customerFormModel.vatCodePrefix3.options = options;
    */

   /*  this.customerFormModel.type.options = [
      { value : null, viewValue : 'Seleziona un valore', text : 'Seleziona un valore' },
      { value : 0, viewValue : 'Persona Fisica', text : 'Persona fisica' },
      { value : 1, viewValue : 'Persona Giuridica', text : 'Persona giuridica' }
    ]; */

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

    console.log("form", this.customerFormModel);
  }
}
