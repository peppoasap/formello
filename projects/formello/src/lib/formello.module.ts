import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormelloComponent } from './formello.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormelloCustomFieldDef } from './custom-field-def.directive';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxAgathaModule } from '@lendingsolution/ngx-agatha-ui';

@NgModule({
  declarations: [FormelloComponent, FormelloCustomFieldDef],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    NgxAgathaModule,
  ],
  exports: [FormelloComponent, FormelloCustomFieldDef],
})
export class FormelloModule {}
