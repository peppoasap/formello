# Formello
## _Angular Form Generation based on Models_
[![Angular](https://img.shields.io/badge/%20-Angular%208+-red?style=for-the-badge&logo=angular)]()
[![Angular](https://img.shields.io/badge/%20-Angular%20Material-blue?style=for-the-badge&logo=angular)]()
[![Lending Solution](https://img.shields.io/badge/Powered%20By-Lending%20Solution-ff69b4?style=for-the-badge)](https://www.lendingsolution.it)

Formello is a form generation system based on models for Angular 8+

## Features

- Custom model creation
- Automatic form creation component based on configuration
- Data persistence on configuration changes
- Injectable model
- Validation and errors management
- Custom Preset Field
- Service injection in model
- Supported field: Text, Select, Radio, Checkbox, Date, Autocomplete

## Installation

Formello requires [Angular](https://angular.io/) v8+ and [Angular Material/CDK](https://material.angular.io) to run.

```sh
npm install formello
```
Import formello module in your main/shared module.
```javacript
@NgModule ({....
  imports: [...,
  FormelloModule
…]
})
```

## How to create a Model

In your favorite folder create a <name>.form.ts file.
## Field Creation
```ts
new FormelloField(_name: string, _value: string | number | boolean | null, _type: FormelloFieldTypes, _validators?: ValidatorFn[], _options?: Array<IFormelloFieldOption>)
```
Where IFormelloFieldOption is a object {value: string | number | boolean, viewValue: string};

### FormelloFieldTypes supported now are:

| Type |  |
| ------ | ------ |
| TEXT | Basic Text Field |
| SELECT | Select Field - declare options in options param |
| RADIO | Radio Field - declare options in options param |
| CHECKBOX | Checkbox field - accept one option only!|
| SEARCH_SELECT | Autocomplete select field |
| DATE | Datepicker field |

### Example model
```ts
@Injectable()
export class CustomerFormModel {
    type = new FormelloField('type', 'Typology', null, FormelloFieldTypes.SELECT, [Validators.required], [{ value: 0, viewValue: 'Type 1' }, { value: 1, viewValue: 'Type 2' }]);
    surname = new FormelloField('surname', 'Surname', null, FormelloFieldTypes.TEXT, [Validators.required, Validators.pattern(myCustomPattern)]);
    name = new FormelloField('name', 'Name', null, FormelloFieldTypes.TEXT, [Validators.required, Validators.pattern(myCustomPattern)]);
    email = new FormelloField('email', 'Email', null, FormelloFieldTypes.TEXT, [Validators.email]);
    birthdate = new FormelloField('birthdate', 'Birth Date', null, FormelloFieldTypes.DATE);
    gender = new FormelloField('gender', 'Gender', null, FormelloFieldTypes.RADIO, [], [{ value: "M", viewValue: "Male" }, { value: "F", viewValue: "Female" }]);
    taxCode = new TaxCodeField('taxCode', 'Tax Code', null, [Validators.required]);
}
```

### Custom Field Preset
TaxCodeField is a custom preset field with integrated pattern validation and error.
```ts
const PATTERN_ITALIAN_TAX_CODE = "^[A-Za-z]{6}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{3}[A-Za-z]{1}$";

export class TaxCodeField extends FormelloField {

    constructor(name: string, label: string, value: string, validators?: Array<ValidatorFn>) {
        super(name, label, value, FormelloFieldTypes.TEXT, [Validators.pattern(PATTERN_ITALIAN_TAX_CODE)].concat(validators ? validators : []));
        this.control.valueChanges.pipe(distinctUntilChanged()).subscribe((value: string) => this.control.patchValue(value.toUpperCase()));

        this.setError(GENERIC_ERROR_CODES.PATTERN, GENERIC_ERROR_MESSAGES.TAX_CODE)
    }
}
```

## Create a model configuration (you need it to show form in different way)
To generate your form using formello component you must create a configuration.
Configuration are composed of a model and some rows.
A row is an object like {fields: FormelloField[]};

```ts
export class CustomerFormConfiguration1 implements IFormelloConfig<CustomerFormModel>{
    model: CustomerFormModel;
    rows: Array<IFormelloRow>;

    constructor(model: CustomerFormModel) {
        this.model = model;
        this.rows = [
            { fields: [this.model.type] },
            { fields: [this.model.name, this.model.surname] },
            { fields: [this.model.gender,  this.model.birthdate] },
            { fields: [this.model.taxCode, this.model.email] }
        ];
    }
}

export class CustomerFormConfiguration2 implements IFormelloConfig<CustomerFormModel>{
    model: CustomerFormModel;
    rows: Array<IFormelloRow>;

    constructor(model: CustomerFormModel) {
        this.model = model;
        this.rows = [
            { fields: [this.model.type] },
            { fields: [this.model.name, this.model.surname, this.model.taxCode] },
            { fields: [this.model.email] }
        ];
    }
}
```
So with this CustomerFormConfiguration1 configuration I want to show a form with 4 rows in the order I have setted with the field in the same order I have setted.

In the second configuration I have a different form view and I hide some fields.

## Use Component

To use your model, you must inject it in your component constructor and to manipulate your formello you need to save his reference.

my-component.component.ts
```ts
@Component({
  selector: 'my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponent implements OnInit {
    myFormello: Formello<CustomerFormModel>;
    
    constructor(public customerFormModel: CustomerFormModel ){
    //Here you create a new Formello passing a configuration to it, with the model injected.
        this.myFormello = new Formello(new CustomerFormConfiguration1(this.customerFormModel));
    }
    
     ngOnInit() {
     // Here I am listening on model type control to change my form configuration based on selected value
        this.customerFormModel.type.control.valueChanges.subscribe(value => {
            switch (value) {
                case 0:
                    this.myFormello.changeConfiguration(new CustomerFormConfiguration1(this.customerFormModel));
                break;
                case 1:
                    this.myFormello.changeConfiguration(new CustomerFormConfiguration2(this.customerFormModel));
                break;
            }
        });
    }
    
}
```

my-component.component.html
```html
    <formello [formello]="myFormello"></formello>
```

## License
MIT


