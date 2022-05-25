import { Injectable, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { GENERIC_ERROR_CODES } from 'formello';
import {
  EMPTY_FIELD,
  FormelloField,
  FormelloFieldTypes,
  IFormelloConfig,
  IFormelloRow,
  TaxCodeField,
} from 'projects/formello/src/public-api';

export enum CustomerType {
  PHYSIC = 0,
  LEGAL = 1,
}

@Injectable()
export class CustomerFormModel implements OnDestroy {
  type = new FormelloField(
    'type',
    'Tipologia',
    CustomerType.PHYSIC,
    FormelloFieldTypes.SELECT,
    [Validators.required],
    [
      { value: CustomerType.PHYSIC, viewValue: 'Persona Fisica' },
      { value: CustomerType.LEGAL, viewValue: 'Persona Giuridica' },
    ]
  );
  surname = new FormelloField(
    'surname',
    'Cognome',
    null,
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );
  name = new FormelloField('name', 'Nome', null, FormelloFieldTypes.TEXT, [
    Validators.required,
  ]);
  phone = new FormelloField(
    'phone',
    'Telefono',
    null,
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );
  cellphone = new FormelloField(
    'cellphone',
    'Cellulare',
    null,
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );
  cellphone2 = new FormelloField(
    'cellphone2',
    'Altro Contatto telefonico',
    null,
    FormelloFieldTypes.TEXT
  );
  email = new FormelloField('email', 'Email', null, FormelloFieldTypes.TEXT, [
    Validators.email,
  ]);
  birthdate = new FormelloField(
    'birthdate',
    'Data di nascita',
    null,
    FormelloFieldTypes.DATE
  );
  age = new FormelloField('age', 'Età', null, FormelloFieldTypes.TEXT);
  gender = new FormelloField(
    'gender',
    'Sesso',
    null,
    FormelloFieldTypes.RADIO,
    [],
    [
      { value: 'M', viewValue: 'Maschio' },
      { value: 'F', viewValue: 'Femmina' },
    ]
  );
  birthplace = new FormelloField(
    'birthplace',
    'Luogo di nascita',
    null,
    FormelloFieldTypes.TEXT
  );
  birthprovince = new FormelloField(
    'birthprovince',
    'Provincia di nascita',
    null,
    FormelloFieldTypes.TEXT
  );
  taxCode = new TaxCodeField('taxCode', 'Codice Fiscale', '');
  affiliateState = new FormelloField(
    'affiliateState',
    'Stato contatto',
    null,
    FormelloFieldTypes.SELECT
  );
  pec = new FormelloField('pec', 'PEC', null, FormelloFieldTypes.TEXT, [
    Validators.email,
  ]);
  businessName = new FormelloField(
    'businessName',
    'Ragione Sociale',
    null,
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );
  vatCodePrefix = new FormelloField(
    'vatCodePrefix',
    'Prefisso Partita Iva',
    null,
    FormelloFieldTypes.SEARCH_SELECT,
    [Validators.required, Validators.maxLength(2), Validators.minLength(2)]
  );
  vatCode = new FormelloField(
    'vatCode',
    'Partita Iva',
    null,
    FormelloFieldTypes.TEXT,
    [Validators.minLength(11), Validators.maxLength(11)]
  );
  active = new FormelloField(
    'active',
    'Attivo',
    true,
    FormelloFieldTypes.CHECK
  );

  constructor() {
    this.name.setError(GENERIC_ERROR_CODES.REQUIRED, 'Campo richiesto');
  }
  ngOnDestroy() {}
}

export class CustomerFormConfig implements IFormelloConfig<CustomerFormModel> {
  model: CustomerFormModel;
  rows: Array<IFormelloRow>;

  constructor(model: CustomerFormModel) {
    this.model = model;
    this.rows = [
      { fields: [this.model.type] },
      {
        fields: [
          this.model.name,
          this.model.surname,
          this.model.birthdate,
          this.model.birthdate,
          this.model.birthdate,
          this.model.birthdate,
          this.model.age,
          this.model.gender,
        ],
      },
      {
        fields: [
          this.model.birthprovince,
          this.model.birthplace,
          this.model.taxCode,
        ],
      },
      {
        fields: [
          this.model.phone,
          this.model.cellphone,
          this.model.cellphone2,
          EMPTY_FIELD(),
          this.model.email,
          this.model.email,
          EMPTY_FIELD('width-32'),
          this.model.email,
        ],
      },
      {
        fields: [this.model.pec, this.model.vatCodePrefix, this.model.vatCode],
      },
      { fields: [this.model.affiliateState, this.model.active] },
    ];
    this.model.name.label = `Nome*`;
    this.model.surname.label = `Cognome*`;
    this.model.cellphone.label = `Cellulare**`;
    this.model.phone.label = `Telefono**`;
    this.model.vatCodePrefix.control.clearValidators();
    this.model.vatCode.label = 'Partita Iva';
    this.model.name.cssClasses = 'width-100';
  }
}

export class CustomerFormConfigLegalPerson
  implements IFormelloConfig<CustomerFormModel>
{
  model: CustomerFormModel;
  rows: Array<IFormelloRow>;

  constructor(model: CustomerFormModel) {
    this.model = model;
    this.rows = [
      { fields: [this.model.type] },
      {
        fields: [
          this.model.businessName,
          this.model.taxCode,
          this.model.vatCodePrefix,
          this.model.vatCode,
        ],
      },
      {
        fields: [this.model.phone, this.model.cellphone, this.model.cellphone2],
      },
      { fields: [this.model.email, this.model.pec] },
      { fields: [this.model.affiliateState] },
    ];
    this.model.businessName.label = `Ragione Sociale*`;
    this.model.cellphone.label = `Cellulare**`;
    this.model.phone.label = `Telefono**`;
    this.model.vatCode.label = `Partita IVA**`;
    this.model.taxCode.label = `Codice Fiscale**`;
  }
}
