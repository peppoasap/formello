import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormelloComponent } from './formello.component';

describe('FormelloComponent', () => {
  let component: FormelloComponent;
  let fixture: ComponentFixture<FormelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormelloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
